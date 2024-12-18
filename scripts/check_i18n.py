import argparse
import json
import os
import re
import sys

mismatch = False


# 定义一个函数来提取对象
def extract_object(content, lang):
    pattern = rf"export const {lang} = "
    start_index = content.find(pattern)
    if start_index == -1:
        return None

    # 从开始位置向后查找第一个 {
    start_index += len(pattern)
    brace_count = 0
    end_index = start_index

    while end_index < len(content):
        if content[end_index] == "{":
            brace_count += 1
        elif content[end_index] == "}":
            brace_count -= 1

        # 当大括号匹配时，返回当前索引
        if brace_count == 0:
            return content[start_index : end_index + 1]
        end_index += 1

    return None


# 定义一个处理 JSON 字符串的函数
def process_json_string(json_str):
    # print("zh_json_str:", json_str)

    # 直接删除 + 及其左右相邻的引号
    json_str = re.sub(r'([\'"])\s*\+\s*([\'"])', "", json_str)

    # 确保属性名用双引号括起来
    json_str = re.sub(r"(\w+):", r'"\1":', json_str)

    # 处理可能的未定义变量，将其值替换为字符串
    json_str = re.sub(r'("(\w+)":)\s*([a-zA-Z_][a-zA-Z0-9_]*)', r'\1 "\3"', json_str)

    # 将所有值替换为空字符串
    json_str = re.sub(r'("(\w+)":)\s*([\'"])(.*?)\3', r'\1 "***"', json_str)

    # 将所有单引号换为双引号(防止此时还有单引号包裹的键名)
    json_str = json_str.replace("'", '"')

    # 处理可能的多余的逗号（如果有的话）
    json_str = re.sub(r",\s*}", "}", json_str)

    return json_str


# 定义一个比较字典的函数
def compare_dicts(dict1, dict2, path="", file_path=""):
    for key in dict1.keys():
        if key not in dict2:
            print(f'(File: {file_path}) Key "{path + key}" is missing in en.')
            mismatch = True
        else:
            # 如果值是字典，递归比较
            if isinstance(dict1[key], dict) and isinstance(dict2[key], dict):
                compare_dicts(dict1[key], dict2[key], path + key + ".", file_path)

    for key in dict2.keys():
        if key not in dict1:
            print(f'(File: {file_path}) Key "{path + key}" is missing in zh.')
            mismatch = True


def process_messages_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        js_content = file.read()

    # 提取 zh 和 en 对象
    zh_json_str = extract_object(js_content, "zh")
    en_json_str = extract_object(js_content, "en")

    if zh_json_str and en_json_str:

        # 处理 JSON 字符串
        zh_json_str = process_json_string(zh_json_str)
        en_json_str = process_json_string(en_json_str)

        # print(f"Processing file: {file_path}")
        # print("zh_json_str:", zh_json_str)
        # print("en_json_str:", en_json_str)

        try:
            # 将字符串转换为字典
            zh_dict = json.loads(zh_json_str)
            en_dict = json.loads(en_json_str)

            # 比较两个字典，并传递文件路径
            compare_dicts(zh_dict, en_dict, file_path=file_path)

        except json.JSONDecodeError as e:
            print(f"JSON Decode Error in {file_path}: {e}")
            sys.exit(1)  # 退出并返回错误状态

    else:
        print(f"some lang is None")
        sys.exit(1)


def main():
    # 创建一个解析器对象
    parser = argparse.ArgumentParser(
        description="Check for key correspondence in messages.js files."
    )

    # 添加一个位置参数
    parser.add_argument("path", type=str, help="The path to the folder")

    # 解析命令行参数
    args = parser.parse_args()

    # 遍历文件夹中的所有文件
    for root, dirs, files in os.walk(args.path):
        for file in files:
            if file == "messages.js":
                # 拼接文件的完整路径
                file_path = os.path.join(root, file)
                # 处理该文件
                process_messages_file(file_path)

    print("check finished.")
    if mismatch:
        sys.exit(1)  # 退出并返回错误状态


if __name__ == "__main__":
    main()
