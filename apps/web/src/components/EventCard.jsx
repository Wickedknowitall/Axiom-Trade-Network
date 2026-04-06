
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const EventCard = ({ event, onRegisterInterest, index = 0 }) => {
  const formattedDate = event.date ? format(new Date(event.date), 'MMMM d, yyyy') : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6 flex-1">
          <h3 className="text-xl font-semibold mb-3 text-foreground">{event.eventName}</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">{event.description}</p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button 
            onClick={() => onRegisterInterest(event)} 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
          >
            Register interest
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EventCard;
