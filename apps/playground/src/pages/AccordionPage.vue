<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const accordionType = ref<'single' | 'multiple'>('single')
const collapsible = ref(true)
const disabled = ref(false)

const faqItems = [
  {
    value: 'what-is-stellar',
    question: 'What is Stellar Vue UI?',
    answer:
      'Stellar Vue UI is a copy-paste style component library for Vue 3, inspired by shadcn-vue. It provides beautifully designed, accessible components that you can drop into your projects.',
  },
  {
    value: 'is-it-free',
    question: 'Is it free to use?',
    answer:
      'Yes, Stellar Vue UI is completely free and open-source. You can use it in personal and commercial projects without any restrictions.',
  },
  {
    value: 'how-to-install',
    question: 'How do I install it?',
    answer:
      'You can install Stellar Vue UI using the CLI tool. Run `npx stellar-vue-ui init` to set up your project, then use `npx stellar-vue-ui add` to add individual components.',
  },
  {
    value: 'customization',
    question: 'Can I customize the components?',
    answer:
      'Absolutely. Since Stellar Vue UI follows the copy-paste model, you own the source code. You can modify components, change styles, and adjust behavior to fit your exact needs.',
  },
  {
    value: 'accessibility',
    question: 'Are the components accessible?',
    answer:
      'Yes. All interactive components are built on Radix Vue primitives, which provide robust keyboard navigation, screen reader support, and WAI-ARIA compliance out of the box.',
  },
]
</script>

<template>
  <div>
    <PageHeader
      title="Accordion"
      description="A vertically stacked set of interactive headings that each reveal a section of content."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Interactive demo -->
      <DemoSection
        title="Interactive Demo"
        description="Configure accordion behavior using the controls below."
      >
        <div class="flex flex-col gap-6">
          <div class="max-w-lg">
            <Accordion :type="accordionType" :collapsible="collapsible" :disabled="disabled">
              <AccordionItem
                v-for="item in faqItems.slice(0, 3)"
                :key="item.value"
                :value="item.value"
              >
                <AccordionTrigger>{{ item.question }}</AccordionTrigger>
                <AccordionContent>{{ item.answer }}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div class="grid grid-cols-3 gap-4 border-t border-border pt-4 text-sm">
            <div>
              <p class="font-medium mb-2 text-muted-foreground">Type</p>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="t in ['single', 'multiple'] as const"
                  :key="t"
                  class="px-2 py-1 rounded text-xs border transition-colors"
                  :class="
                    accordionType === t
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-input hover:bg-accent'
                  "
                  @click="accordionType = t"
                >
                  {{ t }}
                </button>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="collapsible" type="checkbox" class="rounded" />
                <span>Collapsible</span>
              </label>
            </div>
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="disabled" type="checkbox" class="rounded" />
                <span>Disabled</span>
              </label>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- Single type -->
      <DemoSection title="Single Mode" description="Only one item can be open at a time.">
        <div class="max-w-lg">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and
                bank transfers for annual subscriptions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your subscription at any time from your account settings. Your
                access will continue until the end of the current billing period.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
              <AccordionContent>
                We offer a 30-day money-back guarantee on all plans. If you're not satisfied,
                contact our support team for a full refund.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DemoSection>

      <!-- Multiple type -->
      <DemoSection title="Multiple Mode" description="Multiple items can be open simultaneously.">
        <div class="max-w-lg">
          <Accordion type="multiple">
            <AccordionItem value="features">
              <AccordionTrigger>Features</AccordionTrigger>
              <AccordionContent>
                Our platform includes real-time collaboration, version control, automated
                deployments, and integrated monitoring dashboards.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pricing">
              <AccordionTrigger>Pricing</AccordionTrigger>
              <AccordionContent>
                We offer three tiers: Free for personal projects, Pro at $12/month for small teams,
                and Enterprise with custom pricing for large organizations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger>Support</AccordionTrigger>
              <AccordionContent>
                All plans include community forum access. Pro and Enterprise plans include email
                support with guaranteed response times and priority issue handling.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DemoSection>

      <!-- Disabled state -->
      <DemoSection
        title="Disabled State"
        description="Individual items or the entire accordion can be disabled."
      >
        <div class="max-w-lg space-y-6">
          <div>
            <p class="text-xs text-muted-foreground mb-2">Entire accordion disabled</p>
            <Accordion type="single" collapsible disabled>
              <AccordionItem value="d-1">
                <AccordionTrigger>This item is disabled</AccordionTrigger>
                <AccordionContent>You should not be able to see this.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="d-2">
                <AccordionTrigger>This item is also disabled</AccordionTrigger>
                <AccordionContent>You should not be able to see this either.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <p class="text-xs text-muted-foreground mb-2">Single item disabled</p>
            <Accordion type="single" collapsible>
              <AccordionItem value="e-1">
                <AccordionTrigger>This item works normally</AccordionTrigger>
                <AccordionContent>
                  This content is accessible because the item is not disabled.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="e-2" disabled>
                <AccordionTrigger>This item is disabled</AccordionTrigger>
                <AccordionContent>You should not be able to open this.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="e-3">
                <AccordionTrigger>This item also works</AccordionTrigger>
                <AccordionContent>
                  This content is accessible because the item is not disabled.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </DemoSection>

      <!-- FAQ style -->
      <DemoSection title="FAQ Example" description="A common use case: frequently asked questions.">
        <div class="max-w-lg">
          <Accordion type="single" collapsible>
            <AccordionItem v-for="item in faqItems" :key="item.value" :value="item.value">
              <AccordionTrigger>{{ item.question }}</AccordionTrigger>
              <AccordionContent>{{ item.answer }}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
