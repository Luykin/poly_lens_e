# Accordion

Simple accordion usage with examples

## Table of Contents

- [Basic implementation](#basic-implementation)
- [With disabled item](#with-disabled-item)
- [With collapsible set to false](#with-collapsible-set-to-false)
- [@Inputs](#inputs)
  - [Accordion inputs](#accordion-inputs)
  - [Accordion item inputs](#accordion-item-inputs)

### Basic implementation

```html
<oz-accordion>
  <oz-accordion-item title="Title one">
    <ng-template ozAccordionContent>
      <div class="accordion-item">
        <p>Accordion item 1</p>
      </div>
    </ng-template>
  </oz-accordion-item>
  <oz-accordion-item title="Title two">
    <ng-template ozAccordionContent>
      <div class="accordion-item">
        <p>Accordion item 2</p>
      </div>
    </ng-template>
  </oz-accordion-item>
</oz-accordion>
```

### With disabled item

```html
<oz-accordion>
  <oz-accordion-item title="Title one">
    <ng-template ozAccordionContent>
      <div class="accordion-item">
        <p>Accordion item 1</p>
      </div>
    </ng-template>
  </oz-accordion-item>
  <oz-accordion-item title="Title two" [disabled]="true">
    <ng-template ozAccordionContent>
      <div class="accordion-item">
        <p>Accordion item 2</p>
      </div>
    </ng-template>
  </oz-accordion-item>
</oz-accordion>
```

### With collapsible set to false

```html
<oz-accordion [collapsible]="false">
  <oz-accordion-item title="Title one">
    <ng-template ozAccordionContent>
      <div class="accordion-item">
        <p>Accordion item 1</p>
      </div>
    </ng-template>
  </oz-accordion-item>
  <oz-accordion-item title="Title two">
    <ng-template ozAccordionContent>
      <div class="accordion-item">
        <p>Accordion item 2</p>
      </div>
    </ng-template>
  </oz-accordion-item>
</oz-accordion>
```

### @Inputs

#### Accordion inputs

- `collapsible (boolean)` (true by default) - show/hide only one element content at time, when false can expand mutliple elements

#### Accordion item inputs

- `title (string)` **required** - title for item
- `disabled (boolean)` (false by default) - set the item to diabled state (not clickable)
