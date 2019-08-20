import Vue from 'vue'
import Router from 'vue-router'
import ShowBlogs from '@/components/ShowBlogs'
import AddBlog from '@/components/AddBlog'
import SingleBlog from '@/components/SingleBlog'
import EditBlog from '@/components/EditBlog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShowBlogs',
      component: ShowBlogs
    },
    {
      path: '/add',
      name: 'AddBlog',
      component: AddBlog
    },
    {
      path: "/blog/:id",
      component: SingleBlog
    },
    {
      path: "/edit/:id",
      component: EditBlog
    }
  ],
  mode:"history"
})
