<script setup lang="ts">
import { Button, Form, Input, Label, Textarea } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

// Simple local form state (no VeeValidate schema to keep the demo self-contained)
const loginEmail = ref('')
const loginPassword = ref('')

const contactName = ref('')
const contactEmail = ref('')
const contactMessage = ref('')

const signupName = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const signupConfirm = ref('')

function handleLoginSubmit(e: Event) {
  e.preventDefault()
  alert(`Login submitted: ${loginEmail.value}`)
}

function handleContactSubmit(e: Event) {
  e.preventDefault()
  alert(`Contact form submitted by: ${contactName.value}`)
}

function handleSignupSubmit(e: Event) {
  e.preventDefault()
  alert(`Signup submitted for: ${signupEmail.value}`)
}
</script>

<template>
  <div>
    <PageHeader
      title="Form"
      description="Structured form components with labels, descriptions, validation messages, and accessible field bindings."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Login Form -->
      <DemoSection
        title="Login Form"
        description="A simple login form with email and password fields."
      >
        <div class="max-w-md">
          <form class="space-y-6" @submit="handleLoginSubmit">
            <div class="space-y-4">
              <div class="space-y-2">
                <Label for="login-email"> Email </Label>
                <Input
                  id="login-email"
                  v-model="loginEmail"
                  type="email"
                  placeholder="you@example.com"
                />
                <p class="text-xs text-muted-foreground">
                  Enter the email address associated with your account.
                </p>
              </div>

              <div class="space-y-2">
                <Label for="login-password"> Password </Label>
                <Input
                  id="login-password"
                  v-model="loginPassword"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <Button type="submit" class="w-full"> Sign In </Button>
          </form>
        </div>
      </DemoSection>

      <!-- Contact Form -->
      <DemoSection
        title="Contact Form"
        description="A contact form with name, email, and message fields, demonstrating labels, descriptions, and layout."
      >
        <div class="max-w-lg">
          <form class="space-y-6" @submit="handleContactSubmit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="contact-name"> Full Name </Label>
                <Input id="contact-name" v-model="contactName" placeholder="John Doe" />
              </div>

              <div class="space-y-2">
                <Label for="contact-email"> Email </Label>
                <Input
                  id="contact-email"
                  v-model="contactEmail"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="contact-message"> Message </Label>
              <Textarea
                id="contact-message"
                v-model="contactMessage"
                :rows="4"
                placeholder="How can we help you?"
              />
              <p class="text-xs text-muted-foreground">
                Please provide as much detail as possible so we can assist you better.
              </p>
            </div>

            <div class="flex justify-end gap-3">
              <Button type="button" variant="outline"> Cancel </Button>
              <Button type="submit"> Send Message </Button>
            </div>
          </form>
        </div>
      </DemoSection>

      <!-- Signup Form with Validation-style Layout -->
      <DemoSection
        title="Signup Form"
        description="A registration form demonstrating field descriptions, error message placeholders, and form structure."
      >
        <div class="max-w-md">
          <form class="space-y-6" @submit="handleSignupSubmit">
            <div class="space-y-4">
              <div class="space-y-2">
                <Label for="signup-name"> Full Name </Label>
                <Input id="signup-name" v-model="signupName" placeholder="Jane Doe" />
              </div>

              <div class="space-y-2">
                <Label for="signup-email"> Email </Label>
                <Input
                  id="signup-email"
                  v-model="signupEmail"
                  type="email"
                  placeholder="jane@example.com"
                />
                <p class="text-xs text-muted-foreground">
                  We will never share your email with anyone else.
                </p>
              </div>

              <div class="space-y-2">
                <Label for="signup-password"> Password </Label>
                <Input
                  id="signup-password"
                  v-model="signupPassword"
                  type="password"
                  placeholder="Create a password"
                />
                <p class="text-xs text-muted-foreground">
                  Must be at least 8 characters with one uppercase letter and one number.
                </p>
              </div>

              <div class="space-y-2">
                <Label for="signup-confirm"> Confirm Password </Label>
                <Input
                  id="signup-confirm"
                  v-model="signupConfirm"
                  type="password"
                  placeholder="Confirm your password"
                />
                <p
                  v-if="signupConfirm && signupConfirm !== signupPassword"
                  class="text-xs text-destructive"
                >
                  Passwords do not match.
                </p>
              </div>
            </div>

            <Button type="submit" class="w-full"> Create Account </Button>

            <p class="text-center text-xs text-muted-foreground">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </DemoSection>

      <!-- Form Components Demo -->
      <DemoSection
        title="Form Components Structure"
        description="Demonstrates the Form, FormField, FormItem, FormLabel, FormControl, FormDescription, and FormMessage component hierarchy. Note: FormField requires VeeValidate context to function — this demo shows the structural layout."
      >
        <div class="max-w-md">
          <Form>
            <div class="space-y-4">
              <div class="space-y-2">
                <Label> Username </Label>
                <Input placeholder="@stellar-user" />
                <p class="text-xs text-muted-foreground">This is your public display name.</p>
              </div>

              <div class="space-y-2">
                <Label> Display Name </Label>
                <Input placeholder="Stellar User" />
                <p class="text-xs text-muted-foreground">
                  This name will be shown across the application.
                </p>
              </div>

              <div class="space-y-2">
                <Label> Website </Label>
                <Input placeholder="https://example.com" />
                <p class="text-xs text-muted-foreground">Your personal or company website URL.</p>
                <p class="text-xs text-destructive">Please enter a valid URL.</p>
              </div>
            </div>

            <div class="mt-6">
              <Button
                type="button"
                @click="
                  (e: Event) => {
                    e.preventDefault()
                    alert('Profile updated!')
                  }
                "
              >
                Update Profile
              </Button>
            </div>
          </Form>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
