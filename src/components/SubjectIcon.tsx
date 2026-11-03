import React from 'react';
import {
  FlaskConical,
  Calculator,
  BookOpen,
  Landmark,
  Globe,
  Palette,
  Music,
  Code2,
} from 'lucide-react';
import { Subject } from '../types';

interface SubjectIconProps {
  icon: Subject['icon'];
  className?: string;
  size?: number;
}

export const SubjectIcon: React.FC<SubjectIconProps> = ({
  icon,
  className = 'w-5 h-5',
  size = 20,
}) => {
  switch (icon) {
    case 'flask':
      return <FlaskConical size={size} className={className} />;
    case 'calculator':
      return <Calculator size={size} className={className} />;
    case 'book':
      return <BookOpen size={size} className={className} />;
    case 'landmark':
      return <Landmark size={size} className={className} />;
    case 'globe':
      return <Globe size={size} className={className} />;
    case 'palette':
      return <Palette size={size} className={className} />;
    case 'music':
      return <Music size={size} className={className} />;
    case 'code':
      return <Code2 size={size} className={className} />;
    default:
      return <BookOpen size={size} className={className} />;
  }
};
