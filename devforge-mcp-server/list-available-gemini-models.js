// List all available Gemini models for this API key
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyAHbjQLuc3CMiJ9xo302x-aqeFcqzSmh68';

console.log('📋 Listing Available Gemini Models\n');
console.log('='.repeat(80));

try {
  const genAI = new GoogleGenerativeAI(apiKey);

  console.log('\nFetching available models from API...\n');

  // Use the internal API to list models
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  console.log('✅ Successfully retrieved model list!\n');
  console.log('='.repeat(80));
  console.log('\n📦 Available Models:\n');

  if (data.models && data.models.length > 0) {
    const generativeModels = data.models.filter(m =>
      m.supportedGenerationMethods?.includes('generateContent')
    );

    console.log(`Total Models: ${data.models.length}`);
    console.log(`Generative Models: ${generativeModels.length}\n`);

    console.log('Models that support generateContent():\n');

    generativeModels.forEach((model, index) => {
      const modelName = model.name.replace('models/', '');
      console.log(`${(index + 1).toString().padStart(2)}. ${modelName}`);
      if (model.displayName) {
        console.log(`    Display Name: ${model.displayName}`);
      }
      if (model.description) {
        console.log(`    Description: ${model.description.substring(0, 80)}...`);
      }
      console.log('');
    });

    console.log('='.repeat(80));
    console.log('\n🎯 Recommended Model to Use:\n');

    const flashModel = generativeModels.find(m => m.name.includes('flash'));
    const proModel = generativeModels.find(m => m.name.includes('pro'));
    const recommendedModel = flashModel || proModel || generativeModels[0];

    if (recommendedModel) {
      const modelName = recommendedModel.name.replace('models/', '');
      console.log(`   Model: ${modelName}`);
      console.log(`   Display Name: ${recommendedModel.displayName || 'N/A'}`);
      console.log('\n📝 Update your code with this model name!\n');
    }

    console.log('='.repeat(80));

  } else {
    console.log('⚠️  No models found in the response\n');
    console.log('Response:', JSON.stringify(data, null, 2));
  }

} catch (error) {
  console.log('\n❌ Error listing models:\n');
  console.log('Error:', error.message);

  if (error.message.includes('403')) {
    console.log('\n💡 403 Forbidden - API key doesn\'t have permission');
    console.log('   Make sure Generative Language API is enabled');
  } else if (error.message.includes('404')) {
    console.log('\n💡 404 Not Found - Wrong API endpoint or key invalid');
  }

  console.log('\n' + '='.repeat(80));
}
