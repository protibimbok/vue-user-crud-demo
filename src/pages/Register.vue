<script lang="ts" setup>
import Button1 from '@/components/Buttons/Button1.vue';
import Select2 from '@/components/Forms/Select2.vue';
import TagList from '@/components/Forms/TagList.vue';
import TextInput2 from '@/components/Forms/TextInput2.vue';
import {setTitle} from '@/helpers/site';
import { ref } from 'vue';
import { getTags, addData, type Response } from '@/helpers/crud'
import TextAlert from '@/components/Alert/TextAlert.vue';
import router from '@/router';
setTitle('Register');

const tagHint = ref<string>();
const tags = ref<string[]>([]);
const formEl = ref<HTMLFormElement>();
const response = ref<Response>();
const submit = () => {
    if(!formEl.value){
        return;
    }
    if(tags.value.length == 0){
        tagHint.value = 'Please select at least one tag...';
    }else if(tags.value.length > 3){
        tagHint.value = 'Maximum three tags are allowed...';
    }else{
        tagHint.value = undefined;
    }
    if(tagHint.value){
        return;
    }
    const data = {
        uses: tags.value
    };
    for(let i = formEl.value.length - 1; i > -1; i-- ){
        //@ts-ignore
        data[formEl.value[i].name] = formEl.value[i].value;
    }
    const res = addData(data);
    
    if(!res.error){
        router.push('/');
    }
    response.value = res;
}

const fetchTags = (keyword: string): string[] => {
    /**
     * This function could be passed to the component directly,
     * but used this in case there needs any middleware
     */
    return getTags(keyword);
}
</script>
<template>
    <div class="container mx-auto mt-5 p-4">
        <div class="bg-white rounded-lg border max-w-2xl mx-auto">
            <h3 class="px-4 py-3 font-bold text-md border-b">Register</h3>
            <form class="block p-4" ref="formEl">
                <TextAlert v-if="response || tagHint" :type="(response?.error || tagHint)?'error':'success'">{{ response?.message || tagHint }}</TextAlert>
                <TextInput2
                    name="name"
                    label="Name"
                    :hint="response?.errors?.name"/>
                <TextInput2
                    name="email"
                    label="Email"
                    type="email"
                    :hint="response?.errors?.email"/>
                
                <TextInput2
                    name="password"
                    label="Password"
                    type="password"
                    :hint="response?.errors?.password"/>
                <Select2
                    name="profession"
                    label="Profession">
                    <option value="">Select Profession</option>
                    <option value="student">Student</option>
                    <option value="techer">Techer</option>
                    <option value="other">Other</option>
                </Select2>
                <TagList
                    v-model="tags"
                    :fetcher="fetchTags"
                    label="What would you use this service for?"
                    placeholder="Type"
                    :hint=" tagHint ||  'Select a maximum of 3 items'"
                    :hint-type="tagHint?'error':'none'"/>
                <Button1
                    @click="submit"
                    class="mt-4">
                    Sign UP
                </Button1>
            </form>
        </div>
    </div>
</template>