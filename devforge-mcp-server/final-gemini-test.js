// Final test with our Gemini adapter
import { GeminiAdapter } from './build/adapters/gemini-adapter.js';

console.log('🎯 Final Gemini Adapter Test\n');
console.log('='.repeat(80));

try {
  const apiKey = 'AIzaSyAHbjQLuc3CMiJ9xo302x-aqeFcqzSmh68';
  const model = 'gemini-2.0-flash';

  console.log(`\nCreating Gemini Adapter...`);
  console.log(`   API Key: ${apiKey.substring(0, 20)}...`);
  console.log(`   Model: ${model}\n`);

  const adapter = new GeminiAdapter(apiKey, model);

  console.log('✅ Adapter created successfully!');
  console.log(`   Provider: ${adapter.getProviderName()}`);
  console.log(`   Model: ${adapter.getModelName()}\n`);

  console.log('Testing text generation...\n');

  const response = await adapter.generateText(
    'Say "Hello from Gemini 2.0 Flash via DevForge!" and nothing else.',
    100
  );

  console.log('='.repeat(80));
  console.log('\n🎉 SUCCESS! Gemini Adapter is FULLY WORKING!\n');
  console.log(`Response: "${response.trim()}"\n`);
  console.log('='.repeat(80));
  console.log('\n✅ All Systems Ready!\n');
  console.log('📝 Summary:\n');
  console.log('   ✅ Gemini API Key: Working');
  console.log('   ✅ Model: gemini-2.0-flash');
  console.log('   ✅ Adapter: Functional');
  console.log('   ✅ Text Generation: Success');
  console.log('\n🚀 Next Step: Restart Claude Desktop and test!\n');
  console.log('='.repeat(80));

} catch (error) {
  console.log('\n❌ Error:\n');
  console.log(error.message);
  console.log('\n='.repeat(80));
}
