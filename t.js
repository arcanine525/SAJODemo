<KeyboardAvoidingView behavior='padding' style={styles.container}>
    <TouchableWithoutFeedback style={styles.container}
        onPress={Keyboard.dismiss}>
        <View style={styles.logoContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo}
                    source={require('../images/logo.png')}>
                </Image>
                <Text style={styles.title}>Account Information</Text>
            </View>
            <View style={styles.infoContainer}>
                <TextInput style={styles.input}
                    placeholder="Enter username/email"
                    placeholderTextColor='rgba(255,255,255,0.8)'
                    keyboardType='email-address'
                    returnKeyType='next'
                    autoCorrect={false}
                    onSubmitEditing={() => this.refs.txtPassword.focus()}
                />
                <TextInput style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor='rgba(255,255,255,0.8)'
                    returnKeyType='go'
                    secureTextEntry
                    autoCorrect={false}
                    ref={"txtPassword"}
                />
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableWithoutFeedback>
</KeyboardAvoidingView>