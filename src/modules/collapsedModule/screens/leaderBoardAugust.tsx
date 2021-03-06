import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {MyContext} from './topTab1LeaderBoard';
import {Strings} from '../../../utils/constants/strings';
import {vh, vw} from '../../../utils/constants/dimensions';
import CustomFlatList from '../../../reusableComponents/customFlatList';
import {colors} from '../../../utils/constants/colors';
import {collapsedData} from '../../../utils/constants/collapsedModuleData';

interface Props {
  item: {rank?: number; member: string; point?: number};
}

export default function LeaderBoardAugust() {
  const post: any = useContext(MyContext);

  const renderItem = ({item}: Props) => {
    return (
      <View style={styles.listHeaderView}>
        <View style={styles.rankView}>
          <Text style={styles.rankText}>{`${Strings.hash}${item.rank}`}</Text>
        </View>
        <View style={styles.communityView}>
          <Text style={styles.memberText}>{item.member}</Text>
        </View>
        <View style={styles.karmaPointsView}>
          <Text style={styles.karmaText}>{item.point}</Text>
        </View>
      </View>
    );
  };

  return (
    <Animated.View style={styles.viewFlatListStyle}>
      <View style={styles.descriptionView}>
        <Text>{Strings.leaderBoardUpdateDescription}</Text>
      </View>
      <CustomFlatList
        style={styles.flatListStyle}
        data={collapsedData}
        listHeader={ListHeader}
        bounces={false}
        renderItem={renderItem}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: post,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        throttle={16}
      />
    </Animated.View>
  );
}

export const ListHeader = () => {
  return (
    <View style={styles.listHeaderView}>
      <View style={styles.rankView}>
        <Text style={styles.listHeaderText}>{'Rank'}</Text>
      </View>
      <View style={styles.communityView}>
        <Text style={styles.listHeaderText}>{'Community Members'}</Text>
      </View>
      <View style={styles.karmaPointsView}>
        <Text style={styles.listHeaderText}>{'Karma Points'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionView: {
    backgroundColor: '#FEDB6B',
    height: vh(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeaderView: {
    flexDirection: 'row',
    height: vh(50),
    paddingHorizontal: vw(20),
    alignItems: 'center',
  },
  rankView: {
    width: vw(50),
    alignItems: 'center',
    marginRight: vw(20),
  },
  communityView: {
    width: vw(120),
  },
  karmaPointsView: {
    left: vw(58),
    width: vw(90),
    alignItems: 'center',
    justifyContent: 'center',
  },
  listHeaderText: {
    fontSize: vw(12),
    fontWeight: '400',
    color: colors.textGrey,
  },
  rankText: {
    fontSize: vw(12),
    fontWeight: '500',
    color: colors.textGrey,
  },
  memberText: {
    color: colors.textBlack,
  },
  karmaText: {
    color: colors.textBlack,
    fontSize: vw(15),
    fontWeight: '700',
  },
  flatListStyle: {backgroundColor: colors.white},
  viewFlatListStyle: {flex: 1},
});
