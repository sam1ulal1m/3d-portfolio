import { useState, useEffect } from 'react';
import { projectsAPI, skillsAPI, aboutAPI, analyticsAPI } from '../utils/api';

function Dashboard({ setIsAuthenticated }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState({ content: '', image: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [analyticsRes, projectsRes, skillsRes, aboutRes] = await Promise.all([
        analyticsAPI.get(),
        projectsAPI.getAll(),
        skillsAPI.getAll(),
        aboutAPI.get()
      ]);
      setAnalytics(analyticsRes.data);
      setProjects(projectsRes.data);
      setSkills(skillsRes.data);
      setAbout(aboutRes.data || { content: '', image: '' });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectData = {
      title: formData.get('title'),
      description: formData.get('description'),
      image: formData.get('image'),
      link: formData.get('link'),
      tags: formData.get('tags').split(',').map(tag => tag.trim())
    };

    try {
      await projectsAPI.create(projectData);
      fetchData();
      e.target.reset();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const skillData = {
      name: formData.get('name'),
      level: formData.get('level'),
      icon: formData.get('icon')
    };

    try {
      await skillsAPI.create(skillData);
      fetchData();
      e.target.reset();
    } catch (error) {
      console.error('Error creating skill:', error);
    }
  };

  const handleAboutUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const aboutData = {
      content: formData.get('content'),
      image: formData.get('image')
    };

    try {
      await aboutAPI.update(aboutData);
      fetchData();
    } catch (error) {
      console.error('Error updating about:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectsAPI.delete(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const deleteSkill = async (id) => {
    try {
      await skillsAPI.delete(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Portfolio Admin</h1>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-blue-400 hover:text-blue-300">View Site</a>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          {['analytics', 'projects', 'skills', 'about'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize ${
                activeTab === tab 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Analytics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Visits</h3>
                <p className="text-3xl font-bold text-blue-400">{analytics.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Projects</h3>
                <p className="text-3xl font-bold text-green-400">{projects.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <p className="text-3xl font-bold text-purple-400">{skills.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">This Month</h3>
                <p className="text-3xl font-bold text-yellow-400">
                  {analytics.filter(a => new Date(a.createdAt).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Visits</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">Page</th>
                      <th className="text-left py-2">IP</th>
                      <th className="text-left py-2">User Agent</th>
                      <th className="text-left py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.slice(-10).reverse().map((visit, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-2">{visit.page}</td>
                        <td className="py-2">{visit.ip}</td>
                        <td className="py-2 max-w-xs truncate">{visit.userAgent}</td>
                        <td className="py-2">{new Date(visit.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Manage Projects</h2>
            
            {/* Add Project Form */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
              <form onSubmit={handleProjectSubmit} className="grid md:grid-cols-2 gap-4">
                <input
                  name="title"
                  placeholder="Project Title"
                  required
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
                />
                <input
                  name="image"
                  placeholder="Image URL"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
                />
                <input
                  name="link"
                  placeholder="Project Link"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
                />
                <input
                  name="tags"
                  placeholder="Tags (comma separated)"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
                />
                <textarea
                  name="description"
                  placeholder="Project Description"
                  required
                  className="md:col-span-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
                ></textarea>
                <button
                  type="submit"
                  className="md:col-span-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium"
                >
                  Add Project
                </button>
              </form>
            </div>

            {/* Projects List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="bg-gray-800 rounded-lg p-4">
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-full h-32 object-cover rounded mb-3" />
                  )}
                  <h4 className="font-semibold mb-2">{project.title}</h4>
                  <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                  <div className="flex justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tags?.map((tag, index) => (
                        <span key={index} className="bg-blue-600 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Manage Skills</h2>
            
            {/* Add Skill Form */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Add New Skill</h3>
              <form onSubmit={handleSkillSubmit} className="grid md:grid-cols-3 gap-4">
                <input
                  name="name"
                  placeholder="Skill Name"
                  required
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
                />
                <select
                  name="level"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <input
                  name="icon"
                  placeholder="Icon (emoji or class)"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="md:col-span-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium"
                >
                  Add Skill
                </button>
              </form>
            </div>

            {/* Skills List */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <div key={skill._id} className="bg-gray-800 rounded-lg p-4 text-center">
                  {skill.icon && <div className="text-2xl mb-2">{skill.icon}</div>}
                  <h4 className="font-semibold">{skill.name}</h4>
                  {skill.level && <p className="text-gray-400 text-sm">{skill.level}</p>}
                  <button
                    onClick={() => deleteSkill(skill._id)}
                    className="text-red-400 hover:text-red-300 text-sm mt-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Manage About Section</h2>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <form onSubmit={handleAboutUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                  <input
                    name="image"
                    defaultValue={about.image}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">About Content</label>
                  <textarea
                    name="content"
                    defaultValue={about.content}
                    rows={10}
                    placeholder="Write about yourself..."
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-medium"
                >
                  Update About Section
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
