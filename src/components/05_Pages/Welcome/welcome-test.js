return (

        <View style={[utilities.flexCenter, styles.container]}>
            <ImageBackground
              source={image}
              style={styles.image}>
                {/* TODO: image should be aligned closer to the top */}
                <Image style={styles.logo} source={require('../../../../assets/images/logo2.png')}/>
                <Text style={[fonts.h1, {textAlign: 'center', marginBottom: 15}]}>Limited Flash-Drawings for Collectibles</Text>
                <Text style={fonts.p}>Donate to Make Change and Win.</Text>

                {/* Links to Signup */}
                <BlockButton
                  title="SIGN UP FOR 5 FREE CHANCES"
                  color="secondary"
                  onPress={() => navigation.navigate('Signup')}/>

                <View style={{flexDirection: 'row'}}>
                  {/* Links to Login */}
                  <TextLink
                    title="Log in"
                    style={fonts.link}
                    onPress={() => navigation.navigate('Login', { reset: false })}/>
                  {/* TODO: Links to Explore (no explore page currently, button is not functional) */}
                  <Text> or</Text>
                  <TextLink
                    title="Start Exploring"
                    style={fonts.link}
                    onPress={() => navigation.navigate('Home')}/>
                </View>
            </ImageBackground>
        </View>


);
