import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import variables from '../../common/variables';

const getHourArray = (hourStart: number = 8, hourEnd: number = 20): Array<string> => {
  if (hourStart < 0 || hourStart > hourEnd) throw Error('hourStart has to be greater than 0 and lower than hourEnd');
  if (hourEnd > 24) throw Error('hourEnd has to be lesser than 24');

  const items: Array<string> = [];
  new Array<string>(hourEnd - hourStart + 1).fill('').forEach((_, index) => {
    items.push(moment({ hour: index + hourStart }).format('h A'));
  });
  return items;
};

const StickyColumn = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  color: ${variables.colors.disabled};
  gap: 1rem;
`;

const StyledHour = styled.p`
  height: 60px;
  margin: 0;
`;

const HoursColumn: React.FC = () => {
  return (
    <StickyColumn>
      {getHourArray().map((hour) => {
        return <StyledHour key={hour}>{hour}</StyledHour>;
      })}
    </StickyColumn>
  );
};

export default HoursColumn;
