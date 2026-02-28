# TASKS.md - {{PROJECT_NAME}} Implementation Tasks

## TASK_SYSTEM_CONFIG
```yaml
version: 1.0.0
project_root: '{{absolute_path_to_project}}'
spec_file: '{{absolute_path_to_SPEC.md}}'
```
---

## TASK_TEMPLATE
<!--
Use this template for each task. Copy and fill in the values.
-->

```yaml
id: '{{phase}}.{{task_number}}'
phase: {{phase_number}}
name: '{{Descriptive Task Name}}'
depends_on: ['{{prerequisite_task_id}}', '{{another_prerequisite}}']
model: opus # sonnet, opus, haiku - match complexity

prompt: |
  ## Task: {{Task Name}}

  ## Working Directory
  {{absolute_path_to_project}}

  ## Reference
  Read TECHNICAL_SPEC.md Section {{X.X}} ({{SECTION_NAME}}) at:
  {{absolute_path_to_TECHNICAL_SPEC.md}}

  ## Context
  {{Brief context about why this task exists and what depends on it}}

  ## Instructions

  ### Step 1: {{Step Name}}
  {{Detailed instructions with exact commands or code}}

  ### Step 2: {{Step Name}}
  {{Continue with all steps...}}

  ## Success Criteria
  - {{Criterion 1 - something verifiable}}
  - {{Criterion 2}}
  - {{Criterion 3}}

  ## Edge Cases to Handle
  - {{Edge case 1}}
  - {{Edge case 2}}

outputs:
  - '{{relative/path/to/file1}}'
  - '{{relative/path/to/file2}}'

done_when: '{{Single sentence describing completion state}}'
```

<!--
============================================================
PHASE DEFINITIONS
============================================================
Customize these phases for your project.
The examples below are common patterns - adjust as needed.
-->

## PHASE_0: PROJECT_INITIALIZATION

### Task 0.1: Create Project Directory Structure
```yaml
id: '0.1'
phase: 0
name: Create Project Directory Structure
depends_on: []
model: opus

prompt: |
  ## Task: Create Project Directory Structure

  Create the initial directory structure for the {{PROJECT_NAME}} project.

  ## Working Directory
  Create all files under: {{project_root}}

  ## Directory Structure to Create
  ```
  {{project_name}}/
  ├── {{directory_1}}/
  │   ├── {{subdirectory}}/
  │   └── {{subdirectory}}/
  ├── {{directory_2}}/
  └── {{directory_3}}/
  ```

  Reference: SPEC.md {{APPENDIX_A: FILE_STRUCTURE}}

  ## Instructions
  1. Create all directories listed above
  2. Add a `.gitkeep` file in each empty directory
  3. Create a basic README.md in the root with project name

  ## Success Criteria
  - All directories exist
  - Directory structure matches the spec exactly

outputs:
  - "{{project_name}}/"
  - "{{project_name}}/README.md"

done_when: "All directories created with .gitkeep files"
skip_review: true  # Simple task, no code to review
```

### Task 0.2: Initialize Project Framework
```yaml
id: '0.2'
phase: 0
name: 'Initialize {{Framework}} Project'
status: pending
depends_on: ['0.1']
agent_type: general-purpose
model: sonnet
estimated_context: medium

prompt: |
  ## Task: Initialize {{Framework}} Project

  ## Working Directory
  {{project_root}}

  ## Reference
  Read TECHNICAL_SPEC.md Section 2.1 (FRONTEND) and Section 2.2 (BACKEND)

  ## Instructions

  ### Step 1: Initialize Framework
  Run in the project directory:
  ```bash
  {{framework_init_command}}
  ```

  ### Step 2: Install Core Dependencies
  ```bash
  {{package_manager}} add {{core_dependencies}}
  {{package_manager}} add -D {{dev_dependencies}}
  ```

  ### Step 3: Configure TypeScript
  Update tsconfig.json with strict mode settings from spec.

  ### Step 4: Configure Styling
  {{styling_setup_instructions}}

  ### Step 5: Create Utility Files
  Create lib/utils.ts with common utilities.

  ### Step 6: Create .env.example
  Include all environment variables from TECHNICAL_SPEC.md Section 11.2

  ### Step 7: Update .gitignore
  Ensure sensitive files are excluded.

  ## Success Criteria
  - Development server runs without errors
  - TypeScript compilation succeeds
  - All dependencies installed
  - Configuration files properly set up

outputs:
  - "package.json"
  - "tsconfig.json"
  - "{{config_files}}"
  - ".env.example"
  - ".gitignore"

done_when: "Dev server starts successfully"
```
## Add additional Phases and tasks as needed using the same format.
