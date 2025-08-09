const fetch = require('node-fetch');

async function testAPI() {
  const baseURL = 'http://localhost:5000/api';
  
  try {
    // Test projects endpoint
    const projects = await fetch(`${baseURL}/projects`);
    console.log('Projects:', projects.status, await projects.text());
    
    // Test skills endpoint
    const skills = await fetch(`${baseURL}/skills`);
    console.log('Skills:', skills.status, await skills.text());
    
    // Test about endpoint
    const about = await fetch(`${baseURL}/about`);
    console.log('About:', about.status, await about.text());
    
    console.log('✅ All endpoints are working!');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPI();
