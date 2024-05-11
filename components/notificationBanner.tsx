"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const NotificationPopup = ({
  onClose,
  onOpenChange,
  showNotification,
}: {
  onClose: () => void;
  onOpenChange(open: boolean): void;
  showNotification: boolean;
}) => {
  return (
    <Dialog open={showNotification} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Attention</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Attention!</DialogTitle>
          <DialogDescription>
            This website does not store your data after you refresh the page.
            Any information you enter will be lost. Are you agree with this?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" onClick={onClose}>
              Agree
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const NotificationBanner = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setShowNotification(true);
    }
  }, [showNotification]);

  const handleCloseNotification = () => {
    setShowNotification(false);
    localStorage.setItem("hasVisitedBefore", "true");
  };

  const onOpenChange = (open: boolean) => {
    if (!localStorage.getItem("hasVisitedBefore")) {
      setShowNotification(true);
    }
    setShowNotification(false);
  };

  return (
    <div className="app">
      {showNotification && (
        <NotificationPopup
          onClose={handleCloseNotification}
          onOpenChange={onOpenChange}
          showNotification={showNotification}
        />
      )}
    </div>
  );
};

export default NotificationBanner;
