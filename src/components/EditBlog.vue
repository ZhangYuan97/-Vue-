<template>
  <div id="add-blog">
    <h2 v-if="!submitted">编辑博客</h2>
    <form v-if="!submitted">
      <label>博客标题</label>
      <input type="text" v-model="blog.title" required>

      <label>博客内容</label>
      <textarea v-model="blog.content"></textarea>

      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories">
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories">
        <label>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories">
        <label>Angular4</label>
        <input type="checkbox" value="Angular4" v-model="blog.categories">
      </div>

       <label>作者：</label>
       <select v-model="blog.author">
         <option v-for="author in authors">
           {{author}}
         </option>
       </select>
       <button v-on:click.prevent="post">保存修改</button>
    </form>

    <div v-if="submitted">
      <h3>发布成功！</h3>
    </div>

    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题：{{blog.title}}</p>
      <p>博客内容：</p>
      <p>{{blog.content}}</p>
      <p>博客分类</p>
      <ul>
        <li v-for="category in blog.categories">
          {{category}}
        </li>
      </ul>
      <p>作者：{{blog.author}}</p>
    </div>

  </div>
</template>

<script>
export default {
  //http://jsonplaceholder.typicode.com/posts
  name: 'add-blog',
  data () {
    return {
      id:this.$route.params.id,
      blog:{

      },
      authors:["zhangyuan","xiaozhang","xiaoyuan"],
      submitted:false
    }
  },
  methods:{
  	fetchData() {
  		this.$http.get('https://my-blog-d2f60.firebaseio.com/posts/'+this.id+".json").then(response => {
  			//console.log(response.body)
  			this.blog = response.body
  		})
  	},
    post:function() {
      this.$http.put('https://my-blog-d2f60.firebaseio.com/posts/'+this.id+".json",this.blog).then(function(data) {
            console.log(data);
            this.submitted=true;
          });
    }
  },
  created(){
  	this.fetchData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog *{
  box-sizing: border-box;
}
#add-blog {
  margin: 20px auto;
  margin-left: 210px;
  max-width: 600x;
  padding: 20px;
}
label{
  display: block;
  margin: 20px 0 10px;
}
input[type="text"],textarea,select{
  display: block;
  width: 80%;
  padding: 8px;
}

select {
  width: 10%;
}

textarea {
  height: 200px;
}

#checkboxes label{
  display: inline-block;
  margin-top: 0;
}

#checkboxes input {
  display: inline-block;
  margin-right: 10px;
}

button {
  display: block;
  margin: 20px 0;
  background: green;
  border-radius: 5px;
  padding: 10px;
  color: #fff;
  font-size: 15px;
  border: 0;
  cursor: pointer;
}

#preview {
  padding: 10px 20px;
  border: 1px #ccc dotted;
  margin: 30px 0;
}

h3 {
  margin-top: 10px;
}

</style>
