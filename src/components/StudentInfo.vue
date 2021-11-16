<template>
    <div>
        <ModalImage v-if="isModalOpen" :img="student.photo" :closeModal="closeModal"></ModalImage>
        Number of students: {{studentsCount}}
        <div class="student-card">
            <img :src="student.photo" alt="" @click="isModalOpen = true">
            <div>
                <p>{{student.name}}, {{student.group}}</p>
                <p>Complete <input type="checkbox" v-model="student.isDonePr"></p>
                <p>Mark: {{student.mark}}</p>
            </div>
        </div>
         <router-link :to="'/'">
            <div class="back-button">
                <p>Main</p>
            </div>
         </router-link>
    </div>
</template>
<script>
import ModalImage from './ModalImage.vue'
import Vue from 'vue'
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios)
export default {
    props: {
        id: ''
    },
    data: function(){
        return{
            student: {},
            isModalOpen: false
        }
    },
    components:{
        ModalImage
    },
    mounted: function(){
        Vue.axios.get(`http://46.101.212.195:3000/students/${this.id}`).then(response=>{
            console.log(response.data)
            this.student = response.data
        })
    },
    methods:{
        closeModal: function(){
            this.isModalOpen = false
        }
    },
    computed:{
            studentsCount () {
                return this.$store.getters.getCount
            }
        }
}
</script>