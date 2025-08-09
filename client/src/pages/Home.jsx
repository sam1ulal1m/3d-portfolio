import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { projectsAPI, skillsAPI, aboutAPI } from '../utils/api';

function FloatingSphere() {
  return (
    <Sphere args={[1, 32, 32]} position={[2, 0, 0]}>
      <meshStandardMaterial color="#646cff" />
    </Sphere>
  );
}

function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes, aboutRes] = await Promise.all([
          projectsAPI.getAll(),
          skillsAPI.getAll(),
          aboutAPI.get()
        ]);
        setProjects(projectsRes.data);
        setSkills(skillsRes.data);
        setAbout(aboutRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Samiul Alim</h1>
          <div className="space-x-6">
            <a href="/" className="hover:text-blue-400">Home</a>
            <a href="/projects" className="hover:text-blue-400">Projects</a>
            <a href="/about" className="hover:text-blue-400">About</a>
            <a href="/contact" className="hover:text-blue-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D */}
      <div className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingSphere />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="text-6xl font-bold mb-4">
            Full Stack Developer
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            {about?.content || "Passionate about creating innovative web solutions with modern technologies."}
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            View My Work
          </button>
        </div>
      </div>

      {/* Skills Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div key={skill._id} className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors">
                <h4 className="font-semibold">{skill.name}</h4>
                {skill.level && <p className="text-gray-400 text-sm">{skill.level}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <div key={project._id} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                {project.image && (
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag, index) => (
                      <span key={index} className="bg-blue-600 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
