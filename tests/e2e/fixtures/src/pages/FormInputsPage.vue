<script setup lang="ts">
import {
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'

const inputValue = ref('')
const selectValue = ref('')
const checkboxChecked = ref(false)
const radioValue = ref('')
const switchChecked = ref(false)
</script>

<template>
  <div style="padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px">
    <!-- Input with label -->
    <div style="display: flex; flex-direction: column; gap: 0.5rem">
      <Label for="name-input">Name</Label>
      <Input id="name-input" v-model="inputValue" placeholder="Enter your name" />
    </div>

    <!-- Input with error -->
    <div style="display: flex; flex-direction: column; gap: 0.5rem">
      <Label for="email-input">Email</Label>
      <Input
        id="email-input"
        type="email"
        placeholder="Enter your email"
        aria-describedby="email-error"
      />
      <span id="email-error" style="color: #b91c1c; font-size: 0.875rem">Please enter a valid email address</span>
    </div>

    <!-- Select -->
    <div style="display: flex; flex-direction: column; gap: 0.5rem">
      <Label for="fruit-select">Favourite fruit</Label>
      <Select v-model="selectValue">
        <SelectTrigger id="fruit-select">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">
            Apple
          </SelectItem>
          <SelectItem value="banana">
            Banana
          </SelectItem>
          <SelectItem value="cherry">
            Cherry
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Checkbox -->
    <div style="display: flex; align-items: center; gap: 0.5rem">
      <Checkbox id="terms-checkbox" v-model:checked="checkboxChecked" />
      <Label for="terms-checkbox">Accept terms and conditions</Label>
    </div>

    <!-- Radio Group -->
    <fieldset style="border: none; padding: 0; margin: 0">
      <legend style="font-weight: 500; margin-bottom: 0.5rem">
        Preferred contact method
      </legend>
      <RadioGroup v-model="radioValue" style="display: flex; flex-direction: column; gap: 0.5rem">
        <div style="display: flex; align-items: center; gap: 0.5rem">
          <RadioGroupItem id="radio-email" value="email" />
          <Label for="radio-email">Email</Label>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem">
          <RadioGroupItem id="radio-phone" value="phone" />
          <Label for="radio-phone">Phone</Label>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem">
          <RadioGroupItem id="radio-sms" value="sms" />
          <Label for="radio-sms">SMS</Label>
        </div>
      </RadioGroup>
    </fieldset>

    <!-- Switch -->
    <div style="display: flex; align-items: center; gap: 0.5rem">
      <Switch id="notifications-switch" v-model:checked="switchChecked" />
      <Label for="notifications-switch">Enable notifications</Label>
    </div>
  </div>
</template>
