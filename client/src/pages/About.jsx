import { useState, useEffect } from 'react';
import { aboutAPI, skillsAPI } from '../utils/api';

function About() {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, skillsRes] = await Promise.all([
          aboutAPI.get(),
          skillsAPI.getAll()
        ]);
        setAbout(aboutRes.data);
        setSkills(skillsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Samiul Alim</h1>
          <div className="space-x-6">
            <a href="/" className="hover:text-blue-400">Home</a>
            <a href="/projects" className="hover:text-blue-400">Projects</a>
            <a href="/about" className="text-blue-400">About</a>
            <a href="/contact" className="hover:text-blue-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-bold text-center mb-12">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {about?.image && (
              <img 
                src={about.image} 
                alt="Samiul Alim" 
                className="w-full rounded-lg shadow-lg"
              />
            )}
          </div>
          
          <div>
            <div className="prose prose-lg text-gray-300">
              {about?.content ? (
                <div dangerouslySetInnerHTML={{ __html: about.content }} />
              ) : (
                <div>
                  <p className="mb-4">
                    I'm Samiul Alim, a passionate Full Stack Software Engineer and Shopify Developer 
                    at Devs Nest LLC. With a solid foundation in Computer Science, my expertise spans 
                    across cutting-edge technologies.
                  </p>
                  <p className="mb-4">
                    I specialize in React, Remix, Next.js, and a suite of backend tools like Express.js, 
                    REST, GraphQL, and databases such as PostgreSQL and MongoDB. My proficiency with AWS, 
                    Docker, and CI/CD pipelines empowers me to craft robust and scalable web solutions.
                  </p>
                  <p>
                    As a developer with a keen interest in generative AI and machine learning, I am 
                    dedicated to exploring the synergy between AI and software development to pioneer 
                    innovative solutions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <div key={skill._id} className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors">
                  {skill.icon && (
                    <div className="text-2xl mb-2">{skill.icon}</div>
                  )}
                  <h4 className="font-semibold">{skill.name}</h4>
                  {skill.level && (
                    <p className="text-gray-400 text-sm mt-1">{skill.level}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">Skills will appear here once added via the admin panel.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
