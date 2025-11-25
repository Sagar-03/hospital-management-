import { useState } from 'react';
import styles from './HospitalResources.module.css';

const HospitalResourcesPage = () => {
  const [resources, setResources] = useState([
    { id: 1, name: 'ICU Beds', total: 50, available: 12, occupied: 38, category: 'beds' },
    { id: 2, name: 'General Beds', total: 200, available: 45, occupied: 155, category: 'beds' },
    { id: 3, name: 'Emergency Beds', total: 30, available: 8, occupied: 22, category: 'beds' },
    { id: 4, name: 'Ventilators', total: 25, available: 7, occupied: 18, category: 'equipment' },
    { id: 5, name: 'X-Ray Machines', total: 5, available: 2, occupied: 3, category: 'equipment' },
    { id: 6, name: 'MRI Scanners', total: 3, available: 1, occupied: 2, category: 'equipment' },
    { id: 7, name: 'CT Scanners', total: 4, available: 1, occupied: 3, category: 'equipment' },
    { id: 8, name: 'Operating Rooms', total: 10, available: 3, occupied: 7, category: 'rooms' },
    { id: 9, name: 'Ambulances', total: 8, available: 5, occupied: 3, category: 'vehicles' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState({
    name: '', total: '', available: '', category: 'beds'
  });

  const [filterCategory, setFilterCategory] = useState('all');

  const handleAddResource = () => {
    if (formData.name && formData.total && formData.available) {
      const newResource = {
        id: resources.length + 1,
        name: formData.name,
        total: parseInt(formData.total),
        available: parseInt(formData.available),
        occupied: parseInt(formData.total) - parseInt(formData.available),
        category: formData.category
      };
      setResources([...resources, newResource]);
      setFormData({ name: '', total: '', available: '', category: 'beds' });
      setShowAddModal(false);
    }
  };

  const handleUpdateResource = () => {
    setResources(resources.map(res => 
      res.id === editingResource.id ? {
        ...res,
        name: formData.name,
        total: parseInt(formData.total),
        available: parseInt(formData.available),
        occupied: parseInt(formData.total) - parseInt(formData.available),
        category: formData.category
      } : res
    ));
    setEditingResource(null);
    setFormData({ name: '', total: '', available: '', category: 'beds' });
  };

  const handleDeleteResource = (id) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(res => res.id !== id));
    }
  };

  const openEditModal = (resource) => {
    setEditingResource(resource);
    setFormData({
      name: resource.name,
      total: resource.total.toString(),
      available: resource.available.toString(),
      category: resource.category
    });
  };

  const filteredResources = filterCategory === 'all' 
    ? resources 
    : resources.filter(res => res.category === filterCategory);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'beds': return '🛏️';
      case 'equipment': return '⚕️';
      case 'rooms': return '🏥';
      case 'vehicles': return '🚑';
      default: return '📦';
    }
  };

  const getUtilizationColor = (percentage) => {
    if (percentage >= 80) return '#f5576c';
    if (percentage >= 60) return '#ffa726';
    return '#43e97b';
  };

  const totalStats = {
    totalResources: resources.length,
    totalCapacity: resources.reduce((sum, res) => sum + res.total, 0),
    totalAvailable: resources.reduce((sum, res) => sum + res.available, 0),
    totalOccupied: resources.reduce((sum, res) => sum + res.occupied, 0)
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Hospital Resources</h1>
        <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
          ➕ Add Resource
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statInfo}>
            <h3>{totalStats.totalResources}</h3>
            <p>Total Resources</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statInfo}>
            <h3>{totalStats.totalCapacity}</h3>
            <p>Total Capacity</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <h3>{totalStats.totalAvailable}</h3>
            <p>Available</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
          <div className={styles.statIcon}>🔒</div>
          <div className={styles.statInfo}>
            <h3>{totalStats.totalOccupied}</h3>
            <p>Occupied</p>
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <button 
          className={`${styles.filterBtn} ${filterCategory === 'all' ? styles.active : ''}`}
          onClick={() => setFilterCategory('all')}
        >
          All Resources
        </button>
        <button 
          className={`${styles.filterBtn} ${filterCategory === 'beds' ? styles.active : ''}`}
          onClick={() => setFilterCategory('beds')}
        >
          🛏️ Beds
        </button>
        <button 
          className={`${styles.filterBtn} ${filterCategory === 'equipment' ? styles.active : ''}`}
          onClick={() => setFilterCategory('equipment')}
        >
          ⚕️ Equipment
        </button>
        <button 
          className={`${styles.filterBtn} ${filterCategory === 'rooms' ? styles.active : ''}`}
          onClick={() => setFilterCategory('rooms')}
        >
          🏥 Rooms
        </button>
        <button 
          className={`${styles.filterBtn} ${filterCategory === 'vehicles' ? styles.active : ''}`}
          onClick={() => setFilterCategory('vehicles')}
        >
          🚑 Vehicles
        </button>
      </div>

      <div className={styles.resourcesGrid}>
        {filteredResources.map((resource) => {
          const utilizationPercentage = (resource.occupied / resource.total) * 100;
          return (
            <div key={resource.id} className={styles.resourceCard}>
              <div className={styles.resourceHeader}>
                <div className={styles.resourceIcon}>
                  {getCategoryIcon(resource.category)}
                </div>
                <div className={styles.resourceInfo}>
                  <h3>{resource.name}</h3>
                  <span className={styles.category}>{resource.category}</span>
                </div>
              </div>

              <div className={styles.resourceStats}>
                <div className={styles.statRow}>
                  <span>Total:</span>
                  <strong>{resource.total}</strong>
                </div>
                <div className={styles.statRow}>
                  <span>Available:</span>
                  <strong style={{ color: '#43e97b' }}>{resource.available}</strong>
                </div>
                <div className={styles.statRow}>
                  <span>Occupied:</span>
                  <strong style={{ color: '#f5576c' }}>{resource.occupied}</strong>
                </div>
              </div>

              <div className={styles.utilizationBar}>
                <div className={styles.utilizationLabel}>
                  <span>Utilization</span>
                  <span>{utilizationPercentage.toFixed(0)}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progress}
                    style={{ 
                      width: `${utilizationPercentage}%`,
                      background: getUtilizationColor(utilizationPercentage)
                    }}
                  ></div>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.editBtn} onClick={() => openEditModal(resource)}>
                  ✏️ Edit
                </button>
                <button className={styles.deleteBtn} onClick={() => handleDeleteResource(resource.id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {(showAddModal || editingResource) && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{editingResource ? 'Edit Resource' : 'Add New Resource'}</h2>
            <input
              type="text"
              placeholder="Resource Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.input}
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={styles.input}
            >
              <option value="beds">Beds</option>
              <option value="equipment">Equipment</option>
              <option value="rooms">Rooms</option>
              <option value="vehicles">Vehicles</option>
            </select>
            <input
              type="number"
              placeholder="Total Capacity"
              value={formData.total}
              onChange={(e) => setFormData({ ...formData, total: e.target.value })}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Available"
              value={formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.value })}
              className={styles.input}
            />
            <div className={styles.modalActions}>
              <button 
                className={styles.saveBtn}
                onClick={editingResource ? handleUpdateResource : handleAddResource}
              >
                {editingResource ? 'Update' : 'Add'} Resource
              </button>
              <button 
                className={styles.cancelBtn}
                onClick={() => {
                  setShowAddModal(false);
                  setEditingResource(null);
                  setFormData({ name: '', total: '', available: '', category: 'beds' });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalResourcesPage;