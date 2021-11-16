<template>

    <div class="bg" :class="theme">
        <input @change="setTheme('main')" name="themeRadio" type="radio" :checked="theme === 'primary'" > Main theme
        <input @change="setTheme('additional')" name="themeRadio" type="radio" :checked="theme === 'secondary'"> Аdditional theme
        <p>Number of Students: {{studentsCount}}</p>
        
        <table>
            <input placeholder="Пошук..." type="text" v-model="query">
            <tr>
                <th>Full name</th>
                <th>Group</th>
                <th>Mark</th>
                <th>Complete / Uncomplete</th>
            </tr>
            <tr v-for="student in students" :key="student._id" :class="(student.name.split(' ')[0].includes(query) && query) ? 'red' : null">
                
                    <td>
                        <router-link :to="'/student-info/'+student._id">
                        {{student.name}}
                        </router-link>
                    </td>
                    <td>
                        {{student.group}}
                    </td>
                    <td>
                        {{student.mark}}
                    </td>
                    <td>
                        <input type="checkbox" id="checkbox" :checked="student.isDonePr" />
                    </td>
                    <td>
                        <a @click="deleteStudent(student._id)">Delete</a>
                    </td>
                    <td>
                        <button @click="initUpdateForm(student._id)"><img class="pencil-img" src="/images/pencil.png" alt="Edit"></button>
                    </td>
            </tr>
        </table>

        <input placeholder="Full name" type="text" v-model.trim="studentForm.name">
        <select v-model="studentForm.group">
            <option disabled value="">Group</option>
            <option>RPZ 18 1/9</option>
            <option>RPZ 18 2/9</option>
        </select> 
        <input placeholder="Mark" type="number" step="1" min="1" v-model.number="studentForm.mark">
        <input type="checkbox" id="passed" value="false" v-model="studentForm.isDonePr">
        <label for="passed">Complete</label>
        <button @click="addStudent">OK</button> 
        <button @click="updateStudent(studentForm._id)">Update</button> 
    </div>

</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios)
export default {
    data: function(){ 
            return{
                    students: [],
                    query: '',
                    studentForm: {
                        name: '',
                        group: '',
                        mark: null,
                        isDonePr: false,
                    },
                    isButtonVisible: false
                }
            },
        mounted: function(){
            axios.get("http://46.101.212.195:3000/students").then(response => {
                this.students = [...response.data];
                this.$store.commit('setCount', this.students.length)
            })
            
        },
        methods: {
            deleteStudent: function(id){
                Vue.axios.delete(`http://46.101.212.195:3000/students/${id}`)
                .then(()=>{this.students = this.students.filter(student=>student._id !== id)
                this.$store.commit('setCount', this.students.length)})
            },
            initUpdateForm: function(id){
                
                this.isButtonVisible = true;
                const currentStudent = this.students.find(student => student._id === id)
                this.studentForm = {...currentStudent}
                
            },
            addStudent: function(){
                if(Object.values(this.studentForm).every(value => value === false ? true : value)){
                    Vue.axios.post("http://46.101.212.195:3000/students", this.studentForm)
                    .then(response=> {this.students.push(response.data)
                    this.$store.commit('setCount', this.students.length)})
                } else{
                    alert('Enter full information')
                }
                
            },
            updateStudent: function(id){
                this.isButtonVisible = false;
                const updatedStudent = {...this.studentForm}
                Vue.axios.put(`http://46.101.212.195:3000/students/${id}`, updatedStudent)
                .then(()=>{this.students = this.students.map(student=>student._id === id ? updatedStudent : student)})
            },
            setTheme: function(theme){
                this.$store.commit('setTheme', theme)
            }
        },
        computed:{
            studentsCount () {
                return this.$store.getters.getCount
            },
            theme () {
                return this.$store.getters.getTheme
            },
        }
      
}
</script>
<style scoped>
    .main{
        background-color: lightblue;
    }
    .additional{
        background-color: yellow;
    }
</style>
