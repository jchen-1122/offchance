<View>
    <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{fontSize: 40, }}>Balance</Text>
        <BlockButton
            title="ADD CHANCES"
            color="primary"
            onPress={() => toggleSheet()}/>
            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
    </View>

    <View>
        {/* sliding sheet */}
        <Animated.View
            style={[styles.subView,
            { transform: [{ translateY: bounceValue }] }]}>
            <SlidingSheet
            title='Add Chances'
            content={['Wallet Balance', 'Reload Source', ]}
            toggleSheet={toggleSheet} />
        </Animated.View>
    </View>
</View>
