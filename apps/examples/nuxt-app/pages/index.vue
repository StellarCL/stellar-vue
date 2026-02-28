<script setup lang="ts">
import { z } from 'zod'

// All components and composables are auto-imported — no imports needed!
// UIForm, UIFormField, UIInput, UIButton, UICard, etc. are available globally.

// Define the contact form schema with Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(4, 'Subject must be at least 4 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message must not exceed 500 characters'),
  category: z.enum(['general', 'support', 'billing', 'feedback'], {
    errorMap: () => ({ message: 'Please select a category' }),
  }),
  subscribe: z.boolean().default(false),
})

type ContactForm = z.infer<typeof contactSchema>

// useForm is auto-imported from @stellar-vue-ui/core via the Nuxt module
const form = useForm({
  schema: contactSchema,
  initialValues: {
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general' as const,
    subscribe: false,
  },
})

const submitted = ref(false)
const submittedData = ref<ContactForm | null>(null)

async function onSubmit(values: ContactForm) {
  // Simulate an async API call
  await new Promise(resolve => setTimeout(resolve, 600))
  submittedData.value = values
  submitted.value = true
}

function resetForm() {
  form.resetForm()
  submitted.value = false
  submittedData.value = null
}
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <!-- Success state -->
    <UICard v-if="submitted" class="border-green-200 bg-green-50 dark:bg-green-950">
      <UICardHeader>
        <UICardTitle class="text-green-700 dark:text-green-300">
          Message sent!
        </UICardTitle>
        <UICardDescription>Your enquiry has been received.</UICardDescription>
      </UICardHeader>
      <UICardContent>
        <dl class="space-y-2 text-sm">
          <div>
            <dt class="text-muted-foreground font-medium">
              Name
            </dt>
            <dd>{{ submittedData?.name }}</dd>
          </div>
          <div>
            <dt class="text-muted-foreground font-medium">
              Email
            </dt>
            <dd>{{ submittedData?.email }}</dd>
          </div>
          <div>
            <dt class="text-muted-foreground font-medium">
              Category
            </dt>
            <dd class="capitalize">
              {{ submittedData?.category }}
            </dd>
          </div>
          <div>
            <dt class="text-muted-foreground font-medium">
              Subject
            </dt>
            <dd>{{ submittedData?.subject }}</dd>
          </div>
          <div>
            <dt class="text-muted-foreground font-medium">
              Message
            </dt>
            <dd class="whitespace-pre-wrap">
              {{ submittedData?.message }}
            </dd>
          </div>
        </dl>
      </UICardContent>
      <UICardFooter>
        <UIButton variant="outline" @click="resetForm">
          Send another message
        </UIButton>
      </UICardFooter>
    </UICard>

    <!-- Contact form -->
    <UICard v-else>
      <UICardHeader>
        <UICardTitle>Contact Us</UICardTitle>
        <UICardDescription>
          Fill out the form below and we will get back to you within 24 hours.
          This form uses <strong>vee-validate</strong> + <strong>Zod</strong> validation,
          all auto-imported via the Stellar Nuxt module.
        </UICardDescription>
      </UICardHeader>
      <UICardContent>
        <UIForm :form="form" class="space-y-5" @submit="onSubmit">
          <!-- Name + Email row -->
          <div class="grid gap-4 sm:grid-cols-2">
            <UIFormField name="name">
              <UIFormItem>
                <UIFormLabel>Full Name</UIFormLabel>
                <UIFormControl>
                  <UIInput v-model="form.values.name" placeholder="Jane Smith" />
                </UIFormControl>
                <UIFormMessage />
              </UIFormItem>
            </UIFormField>

            <UIFormField name="email">
              <UIFormItem>
                <UIFormLabel>Email Address</UIFormLabel>
                <UIFormControl>
                  <UIInput
                    v-model="form.values.email"
                    type="email"
                    placeholder="jane@example.com"
                  />
                </UIFormControl>
                <UIFormMessage />
              </UIFormItem>
            </UIFormField>
          </div>

          <!-- Category -->
          <UIFormField name="category">
            <UIFormItem>
              <UIFormLabel>Category</UIFormLabel>
              <UIFormControl>
                <UISelect v-model="form.values.category">
                  <UISelectTrigger>
                    <UISelectValue placeholder="Select a category" />
                  </UISelectTrigger>
                  <UISelectContent>
                    <UISelectItem value="general">
                      General Enquiry
                    </UISelectItem>
                    <UISelectItem value="support">
                      Technical Support
                    </UISelectItem>
                    <UISelectItem value="billing">
                      Billing
                    </UISelectItem>
                    <UISelectItem value="feedback">
                      Feedback
                    </UISelectItem>
                  </UISelectContent>
                </UISelect>
              </UIFormControl>
              <UIFormMessage />
            </UIFormItem>
          </UIFormField>

          <!-- Subject -->
          <UIFormField name="subject">
            <UIFormItem>
              <UIFormLabel>Subject</UIFormLabel>
              <UIFormControl>
                <UIInput v-model="form.values.subject" placeholder="How can we help?" />
              </UIFormControl>
              <UIFormMessage />
            </UIFormItem>
          </UIFormField>

          <!-- Message -->
          <UIFormField name="message">
            <UIFormItem>
              <UIFormLabel>Message</UIFormLabel>
              <UIFormControl>
                <UITextarea
                  v-model="form.values.message"
                  placeholder="Tell us more..."
                  :rows="5"
                />
              </UIFormControl>
              <UIFormDescription>
                Between 10 and 500 characters.
              </UIFormDescription>
              <UIFormMessage />
            </UIFormItem>
          </UIFormField>

          <!-- Subscribe -->
          <UIFormField name="subscribe">
            <UIFormItem class="flex items-center gap-3 space-y-0">
              <UIFormControl>
                <UICheckbox v-model:checked="form.values.subscribe" />
              </UIFormControl>
              <div>
                <UIFormLabel class="cursor-pointer font-normal">
                  Subscribe to newsletter
                </UIFormLabel>
                <UIFormDescription>Receive updates about new components and releases.</UIFormDescription>
              </div>
            </UIFormItem>
          </UIFormField>

          <UIButton type="submit" class="w-full" :disabled="form.isSubmitting">
            {{ form.isSubmitting ? 'Sending...' : 'Send Message' }}
          </UIButton>
        </UIForm>
      </UICardContent>
    </UICard>
  </div>
</template>
