import { Badge } from 'antd';

/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';

import GirdCenter from '../../components/GridCenter';
import { ActivityDocType } from '../../db/types';
import useStore from '../../hooks/useStore';
import { isEmpty } from '../../utils/isEmpty';
import ActivityThumbnail from './ActivityThumbnail';
import { ActivityType } from './ActivityType';

export default function GroupThumbnail({
  activity,
  activeIndex,
  onCoverClick = undefined,
}: {
  activeIndex: number;
  activity: Partial<ActivityDocType>;
  onCoverClick?: (...args) => void | undefined;
}) {
  const activities = useStore((state) => state.activitySlice.activities);
  let combos = (activity?.comboIds?.map((id) => ({
    ...activities.find((a) => a.id === id),
  })) || []) as any;

  // remove empty combo, i.e., deleted activities
  // Todo, update local db when deleting
  combos = combos.filter((c) => !isEmpty(c));

  return (
    <GirdCenter style={{ gridGap: '24px 12px' }}>
      {combos.map((a: ActivityDocType, index) => (
        <>
          {activity.type === ActivityType.Path ? (
            <Badge.Ribbon text={index + 1}>
              <ActivityThumbnail
                active={activeIndex === index}
                key={a.id}
                activity={a}
                onCoverClick={onCoverClick?.bind(null, index)}
              />
            </Badge.Ribbon>
          ) : (
            <ActivityThumbnail
              active={activeIndex === index}
              key={a.id}
              activity={a}
              onCoverClick={onCoverClick?.bind(null, index)}
            />
          )}
        </>
      ))}
    </GirdCenter>
  );
}
