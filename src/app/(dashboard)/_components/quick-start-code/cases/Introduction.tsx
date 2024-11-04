import CodeBlock from '@/app/(dashboard)/_components/quick-start-code/CodeBlock'

const getCode = (team: string) => {
  return `import swanlab
import random

# 初始化SwanLab
run = swanlab.init(
    # 设置项目
    project="my-project",
    workspace="${team}",
    # 跟踪超参数与实验元数据
    config={
        "learning_rate": 0.01,
        "epochs": 10,
    },
)

print(f"学习率为{run.config.learning_rate}")

offset = random.random() / 5

# 模拟训练过程
for epoch in range(2, run.config.epochs):
    acc = 1 - 2**-epoch - random.random() / epoch - offset
    loss = 2**-epoch + random.random() / epoch + offset
    print(f"epoch={epoch}, accuracy={acc}, loss={loss}")
    # 记录指标
    swanlab.log({"accuracy": acc, "loss": loss})
`
}

function Introduction() {
  return <CodeBlock code={getCode('123')} />
}

function IntroductionSider() {
  return <div className="max-w-60 w-full border flex flex-col gap-6">123123123</div>
}

const player = {
  content: <Introduction />,
  sider: <IntroductionSider />
}

export default player
