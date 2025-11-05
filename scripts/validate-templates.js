const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REQUIRED_FIELDS = {
  identity: ['name', 'description', 'purpose', 'author', 'tags', 'license'],
  prompt: ['system_prompt'],
  settings: ['reasoning_level', 'reasoning_strategy', 'memory_policy', 'state_storage'],
  metadata: ['template_version', 'schema_compatibility', 'compatible_frameworks', 'author']
};

const REASONING_LEVELS = ['none', 'optional', 'recommended', 'mandatory'];
const REASONING_STRATEGIES = ['react', 'chain-of-thought', 'tree-of-thought', 'reflection'];

let errors = [];
let warnings = [];
let totalTemplates = 0;

function validateTemplate(filePath, category) {
  totalTemplates++;
  const fileName = path.basename(filePath);
  console.log(`\n✓ Validating: ${category}/${fileName}`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const agent = yaml.load(content);

    // Check for category field (should NOT exist)
    if (agent.identity && agent.identity.category) {
      errors.push(`${category}/${fileName}: Contains 'category' field in YAML. Remove it - category is auto-assigned from folder.`);
    }

    // Validate required sections
    for (const [section, fields] of Object.entries(REQUIRED_FIELDS)) {
      if (!agent[section]) {
        errors.push(`${category}/${fileName}: Missing '${section}' section`);
        continue;
      }

      // Validate required fields
      for (const field of fields) {
        if (!agent[section][field]) {
          errors.push(`${category}/${fileName}: Missing required field '${section}.${field}'`);
        }
      }
    }

    // Validate specific fields
    if (agent.identity) {
      // Description length
      if (agent.identity.description && agent.identity.description.length > 150) {
        warnings.push(`${category}/${fileName}: Description exceeds 150 characters (${agent.identity.description.length})`);
      }

      // Purpose exists
      if (!agent.identity.purpose) {
        errors.push(`${category}/${fileName}: Missing 'purpose' field`);
      }

      // Tags
      if (!Array.isArray(agent.identity.tags) || agent.identity.tags.length === 0) {
        warnings.push(`${category}/${fileName}: No tags specified`);
      }
    }

    // Validate settings
    if (agent.settings) {
      if (!REASONING_LEVELS.includes(agent.settings.reasoning_level)) {
        errors.push(`${category}/${fileName}: Invalid reasoning_level '${agent.settings.reasoning_level}'`);
      }
      if (!REASONING_STRATEGIES.includes(agent.settings.reasoning_strategy)) {
        errors.push(`${category}/${fileName}: Invalid reasoning_strategy '${agent.settings.reasoning_strategy}'`);
      }
    }

    // Validate tools
    if (agent.tools) {
      if (agent.tools.recommended_tools) {
        agent.tools.recommended_tools.forEach((tool, idx) => {
          if (!tool.name || !tool.description || !tool.provider) {
            errors.push(`${category}/${fileName}: Tool ${idx} missing required fields`);
          }
        });
      }
    }

    console.log(`  ✓ Valid`);
  } catch (error) {
    errors.push(`${category}/${fileName}: Parse error - ${error.message}`);
  }
}

function validateAllTemplates() {
  console.log('🔍 Validating Agent Templates...\n');
  console.log('=' .repeat(60));

  const templatesDir = path.join(__dirname, '..', 'templates');
  
  if (!fs.existsSync(templatesDir)) {
    console.error('❌ Templates directory not found!');
    process.exit(1);
  }

  // Read category folders
  const entries = fs.readdirSync(templatesDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const category = entry.name;
      const categoryPath = path.join(templatesDir, category);
      const files = fs.readdirSync(categoryPath);
      const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

      for (const file of yamlFiles) {
        validateTemplate(path.join(categoryPath, file), category);
      }
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Validation Summary:`);
  console.log(`   Total templates: ${totalTemplates}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(err => console.log(`   - ${err}`));
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(warn => console.log(`   - ${warn}`));
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('\n✅ All templates are valid!');
    process.exit(0);
  } else if (errors.length === 0) {
    console.log('\n✅ All templates are valid (with warnings)');
    process.exit(0);
  } else {
    console.log('\n❌ Validation failed!');
    process.exit(1);
  }
}

validateAllTemplates();
