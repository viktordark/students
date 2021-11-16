<template>
    <div class="modal-mask" @click="closeModal">
            <div class="modal-container">
                <div class="modal-image">
                    <img :src="img" alt="">
                </div>
            </div>
    </div>
    
</template>
<script>
export default {
    props: {
        img: '',
        closeModal: null
    }
    
}
</script>