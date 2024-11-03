export const zh = {
  EnterPhoneNumber: {
    placeholder: '请输入您的手机号',
    btn: {
      submit: '发送短信验证码'
    },
    schema: {
      phone: {
        string: '请输入正确的手机号',
        min: '请输入正确的手机号',
        max: '请输入正确的手机号',
        regex: '请输入正确的手机号'
      }
    },
    resp: {
      _400: '手机号格式不正确',
      _403: '操作过于频繁，请1分钟后再试',
      _500: '发送验证码失败，请稍后再试'
    }
  },
  VerificationCode: {
    verifyTip: {
      login: '请输入发送到 <bold>{phone}</bold> 的验证码',
      signup: '您正在创建账号，我们已发送验证码到 <bold>{phone}</bold>，请在下方输入'
    },
    verifying: '验证中，请稍后...',
    back: '返回',
    resp: {
      _500: '您输入的验证码不正确或已过期，请重试并检查是否有拼写错误'
    }
  }
}
export const en = {
  EnterPhoneNumber: {
    placeholder: 'Enter your phone number',
    btn: {
      submit: 'Send SMS code'
    },
    schema: {
      phone: {
        string: 'Enter the correct phone number',
        min: 'Enter the correct phone number',
        max: 'Enter the correct phone number',
        regex: 'Enter the correct phone number'
      }
    },
    resp: {
      _400: 'Invalid phone number',
      _403: 'Too many requests. Please try again in 1 minute.',
      _500: 'Failed to send code. Please try again later.'
    }
  },
  VerificationCode: {
    verifyTip: {
      login: 'Enter the code sent to <bold>{phone}</bold>',
      signup: "If you don't have an account yet, we have sent a code to <bold>{phone}</bold>. Enter it below."
    },

    verifying: 'Verifying, please wait...',
    back: 'Back',
    resp: {
      _500: 'Invalid or expired code. Please retry and check for typos'
    }
  }
}
