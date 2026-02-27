import { useState, useEffect } from 'react';
import { api } from '../../src/api';

export function useHomeData() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const loadData = () => {
    api.getProjects().catch(() => {});
    api.getBuilders().catch(() => {});
  };

  const handleApproveBuilder = (id: number) => {
    api.updateBuilderStatus(id, 'Approved').then(() => {
      loadData();
      alert('Builder approved!');
    });
  };

  const handleRejectBuilder = (id: number) => {
    api.updateBuilderStatus(id, 'Rejected').then(() => {
      loadData();
      alert('Builder rejected!');
    });
  };

  return {
    showProjectModal,
    setShowProjectModal,
    showBuilderModal,
    setShowBuilderModal,
    showClientModal,
    setShowClientModal,
    showSupportModal,
    setShowSupportModal,
    showEventModal,
    setShowEventModal,
    loadData,
    handleApproveBuilder,
    handleRejectBuilder
  };
}
