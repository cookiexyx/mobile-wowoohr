import Vue from 'vue'
import Router from 'vue-router'

import vueTap from 'v-tap'
import { check } from '@/service'

Vue.use(vueTap)
Vue.use(Router)

const Loading = resolve => {
  require.ensure(['@/components/loading'], () => {
    resolve(require('@/components/loading'))
  })
}

const Index = resolve => {
  require.ensure(['@/components/Index'], () => {
    resolve(require('@/components/Index'))
  })
}

const Step2 = resolve => {
  require.ensure(['@/components/step2'], () => {
    resolve(require('@/components/step2'))
  })
}

const Step3 = resolve => {
  require.ensure(['@/components/step3'], () => {
    resolve(require('@/components/step3'))
  })
}

const Agreement = resolve => {
  require.ensure(['@/components/agreement'], () => {
    resolve(require('@/components/agreement'))
  })
}

const Done = resolve => {
  require.ensure(['@/components/done'], () => {
    resolve(require('@/components/done'))
  })
}

const History = resolve => {
  require.ensure(['@/components/history'], () => {
    resolve(require('@/components/history'))
  })
}

const HistoryDetail = resolve => {
  require.ensure(['@/components/historyDetail'], () => {
    resolve(require('@/components/historyDetail'))
  })
}

const EditMaterial = resolve => {
  require.ensure(['@/components/editMaterial'], () => {
    resolve(require('@/components/editMaterial'))
  })
}

const SaveMaterial = resolve => {
  require.ensure(['@/components/saveMaterial'], () => {
    resolve(require('@/components/saveMaterial'))
  })
}

const Notice = resolve => {
  require.ensure(['@/components/notice'], () => {
    resolve(require('@/components/notice'))
  })
}

const Require = resolve => {
  require.ensure(['@/components/require'], () => {
    resolve(require('@/components/require'))
  })
}

const PaymentDetail = resolve => {
  require.ensure(['@/components/paymentDetail'], () => {
    resolve(require('@/components/paymentDetail'))
  })
}

const paySuccess = resolve => {
  require.ensure(['@/components/paySuccess'], () => {
    resolve(require('@/components/paySuccess'))
  })
}

const resultPage = resolve => {
  require.ensure(['@/components/resultPage'], () => {
    resolve(require('@/components/resultPage'))
  })
}

const letter = resolve => {
  require.ensure(['@/components/letter'], () => {
    resolve(require('@/components/letter'))
  })
}

const upgrade = resolve => {
  require.ensure(['@/components/upgrade'], () => {
    resolve(require('@/components/upgrade'))
  })
}

const entry = resolve => {
  require.ensure(['@/components/entry'], () => {
    resolve(require('@/components/entry'))
  })
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Loading',
      component: Loading,
      meta: {title: ''}
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {title: '新增参保'}
    },
    {
      path: '/index/:status',
      name: 'IndexStatus',
      component: Index,
      meta: {title: '新增参保'}
    },
    {
      path: '/step2',
      name: 'Step2',
      component: Step2,
      meta: {title: '新增参保'}
    },
    {
      path: '/step3',
      name: 'Step3',
      component: Step3,
      meta: {title: '新增参保'}
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement,
      meta: {title: 'my社保用户协议书'}
    },
    {
      path: '/done',
      name: 'Done',
      component: Done,
      meta: {title: ''}
    },
    {
      path: '/history/:applyId',
      name: 'History',
      component: History,
      meta: {title: '办理历史'}
    },
    {
      path: '/historyDetail/:orderId',
      name: 'HistoryDetail',
      component: HistoryDetail,
      meta: {title: '办理历史'}
    },
    {
      path: '/editMaterial/:applyId',
      name: 'EditMaterial',
      component: EditMaterial,
      meta: {title: '修改参保材料'}
    },
    {
      path: '/saveMaterial',
      name: 'SaveMaterial',
      component: SaveMaterial,
      meta: {title: '修改参保材料'}
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice,
      meta: {title: '通知'}
    },
    {
      path: '/require',
      name: 'Require',
      component: Require,
      meta: {title: '上传图片'}
    },
    {
      path: '/paymentDetail',
      name: 'paymentDetail',
      component: PaymentDetail,
      meta: {title: '费用详情'}
    },
    {
      path: '/paySuccess/:serialNumber',
      name: 'paySuccess',
      component: paySuccess,
      meta: {title: ''}
    },
    {
      path: '/resultPage',
      name: 'resultPage',
      component: resultPage,
      meta: {title: ''}
    },
    {
      path: '/letter',
      name: 'letter',
      component: letter,
      meta: {title: ''}
    },
    {
      path: '/upgrade',
      name: 'upgrade',
      component: upgrade,
      meta: {title: ''}
    },
    {
      path: '/entry',
      name: 'entry',
      component: entry,
      meta: {title: '新增参保'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  check.ready(function () {
    AlipayJSBridge.call('setTitle', {
      title: to.meta.title
    })
  })
  ap.hideOptionButton()
  next()
})

export default router
