<template>
  <div id="show-blogs" v-theme:column="'narrow'">
     <h1>博客总览</h1>
     <input type="text" placeholder="搜索" v-model="search">
     <div v-for="blog in filteredBlogs" class="single-blog">
     <router-link v-bind:to="'/blog/'+blog.id">	
        <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
     	  <article>{{blog.content | snippet}}</article>
     </router-link>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'show-blogs',
  data(){
  	return {
  		blogs:[],
      search:""
  	}
  },
  created(){
  	axios.get('https://my-blog-d2f60.firebaseio.com/posts.json').then(function(data) {
        return data.data;
  	 }).then((data) => {
       var blogsArray = [];
       for(let key in data){
        data[key].id = key;
        blogsArray.push(data[key]);
       }
       this.blogs = blogsArray;
     })
  },
  computed:{
    filteredBlogs:function() {
      return this.blogs.filter((blog) => {
        return blog.title.match(this.search);
      })
    }
  },
  filters:{
    "to-uppercase":function(value) {
      return value.toUpperCase();
    }
  }
}
</script>

<style>
#show-blogs{
	max-width: 800px;
	margin: 0 auto;
}
input[type="text"] {
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
}
.single-blog{
	padding: 20px;
	margin: 20px 0;
	box-sizing: border-box;
	background: #eee;
  border: 1px dotted #aaa;
}
.single-blog h2{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
#show-blogs a{
  color:#444;
  text-decoration: none;
}
</style>
