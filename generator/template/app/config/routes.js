module.exports = [
  { path: '/', component: () => import('./../App'), children: [
    { path: '/', component: () => import('./../layouts/Main'), children: [
      { path: '/', component: () => import('./../pages/index/Index'), },
    ], },
  ], },
]
