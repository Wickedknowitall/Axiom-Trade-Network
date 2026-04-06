
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [eventInterestModalOpen, setEventInterestModalOpen] = useState(false);
  const [customEventModalOpen, setCustomEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openConsultationModal = () => setConsultationModalOpen(true);
  const closeConsultationModal = () => setConsultationModalOpen(false);

  const openEventInterestModal = (event = null) => {
    setSelectedEvent(event);
    setEventInterestModalOpen(true);
  };
  const closeEventInterestModal = () => {
    setEventInterestModalOpen(false);
    setSelectedEvent(null);
  };

  const openCustomEventModal = () => setCustomEventModalOpen(true);
  const closeCustomEventModal = () => setCustomEventModalOpen(false);

  const value = {
    consultationModalOpen,
    openConsultationModal,
    closeConsultationModal,
    eventInterestModalOpen,
    openEventInterestModal,
    closeEventInterestModal,
    customEventModalOpen,
    openCustomEventModal,
    closeCustomEventModal,
    selectedEvent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
