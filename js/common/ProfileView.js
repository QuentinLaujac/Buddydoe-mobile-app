'use strict';
    
var BuddyColors = require('./BuddyColors');
var CardStayList = require('./CardStayList');
var React = require('React');
var View = require('View');
var StyleSheet = require('StyleSheet');
var { connect } = require('react-redux');

import { Dimensions, Card, Image, Text, Button, TouchableOpacity, TouchableHighlight, ActivityIndicator, ScrollView, TextInput} from 'react-native';
import { cancelStay } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Communications from 'react-native-communications';

var { connect } = require('react-redux');
const db = require('../services/DbServices');
const HttpServices = require('../services/HttpServices');
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class ProfileView extends React.Component {

  constructor(props) {
    super(props);
        this.state = {
            profileFacebookId: "",
            profileFirstname: "",
            profileCreatedEvents: "",
            profileCreatedStays: "",
            profileParticipatedEvents: "",
            profileLevel: "",
            profilePoints: "",
            profileImage: require('./img/default-image.jpg'),
            profileActiveStay: false,
            profileActiveStayHotel: "",
            profileActiveStayAddress: "",
            profileActiveStayStartDate: "",
            profileActiveStayEndDate: "",
            profileActiveStayId: "",
            profileLoadingActiveStay: true,
            profileLoadingPoints: true,
            stayCounterActive: true,
            participatedEventsCounterActive: false,
            createdEventsCounterActive: false,
            profileAge: "",
            profileStays: [],
            profileGender: "",
        };
        console.log("ViewProfileConstructorFBID", this.state.profileFacebookId);
    }

  componentWillReceiveProps(nextProps) {
    this.setState({ profileFacebookId: nextProps.profileFacebookId });
            HttpServices.readByFacebookId(nextProps.profileFacebookId).then(function (resp) {
                if (resp.codeReturn == "403") {
                    dataReturn.type = 'ERROR_READ';
                } else {
                    let userData = resp.data[0];
                    var varGender = "";

                    if(userData[0].gender == 'male')
                    {
                        varGender = 'Homme, ';
                    }
                    if(userData[0].gender == 'female')
                    {
                        varGender = 'Femme,';
                    }

                    console.log('genre :', varGender);
                    console.log('user: ', userData);
                    this.setState({ profileFirstname: userData[0].firstname, 
                                    profileImage: {uri: userData[0].pictureProfileHigh }, 
                                    profileCreatedEvents: userData[0].loyalty[0].createdEvents, 
                                    profileParticipatedEvents: userData[0].loyalty[0].participatedEvents,
                                    profileCreatedStays: userData[0].loyalty[0].createdStays,
                                    profileLevel: userData[0].loyalty[0].level,
                                    profilePoints: userData[0].loyalty[0].points,
                                    profileAge: getAge(userData[0].birthdate),
                                    profileLoadingPoints: false,
                                    profileStays: userData[0].stays,
                                    profileGender: varGender,
                                    });
                }
                }.bind(this));

            HttpServices.checkIfActiveStay(nextProps.profileFacebookId).then(function (stay) {
                if (stay.codeReturn == "403") {
                    this.setState({ profileActiveStay: false,
                                    profileLoadingActiveStay: false,
                                    });
                }
                else {
                    let activeStay= stay.data[0];
                    if (activeStay){
                    this.setState({ profileActiveStay: true,
                                    profileLoadingActiveStay: false, 
                                    profileActiveStayHotel: activeStay.hotel[0].name, 
                                    profileActiveStayAddress: activeStay.hotel[0].address,
                                    profileActiveStayStartDate: activeStay.startDate,
                                    profileActiveStayEndDate: activeStay.endDate,
                                    profileActiveStayId: activeStay._id,
                                    });
                    }
                    else
                    {
                        this.setState({ profileActiveStayHotel: ""}); 
                    }
                }
                }.bind(this));
  }

async onPressCancelStay(facebookId, activeStayId) {
    console.log('this.props.Cancel.FBID :', activeStayId);
        const { dispatch } = this.props;
        await Promise.race([
            dispatch(cancelStay(facebookId, activeStayId)),
        ]);
    }


    render() {
        return (
            <View style={styles.container}>
            {this.renderTitle()}
            </View>
        );
    }

      renderTitle(): ?ReactElement {
        return (
            <View style={styles.container}>
                { this.state.profileFirstname ?
                <View style={styles.header}>
                    <Image style={styles.profilePic} source={this.state.profileImage}/>
                    <Text style={styles.title}>
                    {this.state.profileFirstname}
                    </Text>
                    <Text style={styles.age}>
                    {this.state.profileGender} {this.state.profileAge} ANS
                    </Text>
                </View>:
                <View style={styles.header}>
                    <Image style={styles.profilePic} source={this.state.profileImage}/>
                    <View style={styles.indicatorTitle}>
                        <ActivityIndicator
                            animating = {true}
                            color = 'white'
                            size = "small"
                            style = {styles.activityIndicator}/>
                    </View>
                </View>    
            }


<ScrollView>

        { 
            this.state.profileLoadingPoints ?
                            <View style={styles.barStay}>
                    <View style={styles.barStayIcons}>
                        <Icon name="trophy" size={20} color={BuddyColors.colorBack} />
                    </View>
                    <View style={styles.barItemsStay}>
                        <View style={styles.indicatorTitle}>
                            <ActivityIndicator
                                animating = {true}
                                color = "#e0e0e0"
                                size = "small"
                                style = {styles.activityIndicator}/>
                        </View>
                    </View>
                </View>
                :
            <View style={styles.barLevel}>
                    <View style={styles.barLevelIcons}>
                    <Icon name="trophy" size={20} color={BuddyColors.colorBack} />
                    </View>
                    <View style={styles.barItemsLevel}>
                        <Text style={styles.textSubtitle}>NIVEAU {this.state.profileLevel}</Text>
                        <Text style={styles.barTopActive}>BUDDY DEBUTANT</Text>
                        </View>
                    <View style={styles.barItemsCancelLevel}>
                                <Text style={styles.textPoints}>{this.state.profilePoints}</Text>
                                <Text style={styles.textSubtitle}>Points</Text>
                    </View>
            </View>
                

            }    






        { this.state.profileLoadingActiveStay ?
                <View style={styles.barStay}>
                    <View style={styles.barStayIcons}>
                        <Icon name="bed" size={20} color={BuddyColors.colorBack} />
                    </View>
                    <View style={styles.barItemsStay}>
                        <View style={styles.indicatorTitle}>
                            <ActivityIndicator
                                animating = {true}
                                color = "#e0e0e0"
                                size = "small"
                                style = {styles.activityIndicator}/>
                        </View>
                    </View>
                </View>
            :
        this.state.profileActiveStay ?
            <View style={styles.barStay}>
                    <View style={styles.barStayIcons}>
                        <Icon name="bed" size={20} color={BuddyColors.colorBack} />
                    </View>
                    <View style={styles.barItemsStay}>
                        <Text style={styles.textSubtitle}>SEJOUR</Text>
                        <Text style={styles.barTopActive}>{this.state.profileActiveStayHotel}</Text>
                        <Text style={styles.barTopActive}>{this.state.profileActiveStayAddress}</Text>
                        <Text style={styles.barTopActive}>Du {formatDateToDisplay(this.state.profileActiveStayStartDate)} au {formatDateToDisplay(this.state.profileActiveStayEndDate)}</Text>
                    </View>
                    <View style={styles.barItemsCancelStay}>
                        <TouchableHighlight onPress={() => this.onPressCancelStay(this.state.profileFacebookId, this.state.profileActiveStayId)} underlayColor="white">
                            <View style={[styles.buttonContainer, styles.shadow]}>
                                <Text style={styles.buttonText}>
                                    Annuler
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
            </View>
                    :
            <View style={styles.barStay}>
                    <View style={styles.barStayIcons}>
                    <Icon name="bed" size={20} color={BuddyColors.colorBack} />
                    </View>
                    <View style={styles.barItemsStay}>
                        <Text style={styles.textSubtitle}>SEJOUR</Text>
                        <Text style={styles.barTopActive}>AUCUN SEJOUR ACTIF</Text>
                        </View>
                    <View style={styles.barItemsCancelStay}>
                        <TouchableHighlight onPress={() => this.onPressCreateStay()}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>CREER UN SEJOUR</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
            </View>
            }




                
                <View style={[styles.barCounter]}>
                    <View style={[styles.barItemsCounter, this.state.stayCounterActive && styles.barItemsCounterBorder]}>
                    <TouchableOpacity style={styles.counterOpacity} 
                    onPress={()=> this.setState({stayCounterActive: true, participatedEventsCounterActive: false, createdEventsCounterActive: false})}>
                    { this.state.profileCreatedStays ?
                        <Text style={[styles.textActivitiesCounter, this.state.stayCounterActive && styles.textActivitiesCounterActive]}>{this.state.profileCreatedStays}</Text> :
                        <View style={styles.indicator}>
                            <ActivityIndicator
                                animating = {true}
                                color = "#e0e0e0"
                                size = "small"
                                style = {styles.activityIndicator}/>      
                        </View>
                    }
                        <Text style={[styles.textActivities, this.state.stayCounterActive && styles.textActivitiesActive]}>séjours</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.barItemsCounter, this.state.participatedEventsCounterActive && styles.barItemsCounterBorder ]}>
                    <TouchableOpacity style={styles.counterOpacity} 
                    onPress={()=> this.setState({stayCounterActive: false, participatedEventsCounterActive: true, createdEventsCounterActive: false})}>
                { this.state.profileParticipatedEvents ?
                        <Text style={[styles.textActivitiesCounter, this.state.participatedEventsCounterActive && styles.textActivitiesCounterActive]}>{this.state.profileParticipatedEvents}</Text>:
                    <View style={styles.indicator}>
                        <ActivityIndicator
                            animating = {true}
                            color = "#e0e0e0"
                            size = "small"
                            style = {styles.activityIndicator}/>
                    </View>
                    }
                        <Text style={[styles.textActivities, this.state.participatedEventsCounterActive && styles.textActivitiesActive]}>activités réalisées</Text>
                    </TouchableOpacity>
                    </View>



                    <View style={[styles.barItemsCounter, this.state.createdEventsCounterActive && styles.barItemsCounterBorder]}>
                    <TouchableOpacity style={styles.counterOpacity} 
                    onPress={()=> this.setState({stayCounterActive: false, participatedEventsCounterActive: false, createdEventsCounterActive: true})}>
                    { this.state.profileCreatedEvents ?
                        <Text style={[styles.textActivitiesCounter, this.state.createdEventsCounterActive && styles.textActivitiesCounterActive]}>{this.state.profileCreatedEvents}</Text> :
                        <View style={styles.indicator}>
                            <ActivityIndicator
                                animating = {true}
                                color = "#e0e0e0"
                                size = "small"
                                style = {styles.activityIndicator}/>
                        </View>
                    }
                        <Text style={[styles.textActivities, this.state.createdEventsCounterActive && styles.textActivitiesActive]}>activités créées</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{minHeight: 10}}/>




                <View style={[styles.barContent]}>
                {this.state.profileStays.map(r => 
                    <CardStayList
                    startDate = {getDateDay(r.startDate)}
                    startDateMonth = {getDateMonth(r.startDate)}
                    endDate = {getDateDay(r.endDate)}
                    endDateMonth = {getDateMonth(r.endDate)}
                    hotel = {r.hotel[0].name}
                    address1 = {getAddress1(r.hotel[0].address)}
                    address2 = {getAddress2(r.hotel[0].address)}
                    />)}
                <View style={{minHeight: 10}}/>
                </View>

                </ScrollView>
            </View>

    );
  }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: BuddyColors.colorBack,
        justifyContent: 'center',
        alignItems : 'center',
        height: Dimensions.get('window').height / 3,
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        color: 'white',
        fontWeight: '700',
    },
    age: {
        fontSize: 12,
        color: 'white',
        fontWeight: '700',
    },
    profilePic: {
        borderRadius: 20,
        borderWidth: null,
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
    },
    barStay: {
        borderTopColor: 'white',
        borderTopWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom : 12,
    },
    barLevel: {
        borderTopColor: 'white',
        borderTopWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    barCounter: {
        borderTopColor: 'white',
        borderTopWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomColor: BuddyColors.colorButton,
        borderBottomWidth: 0.4,
    },
    barContent: {
        flex: 1,
        backgroundColor: 'white',
        borderTopColor: '#e0e0e0',
        borderTopColor: 1,
    },
    barItemsContent: {
        flex: 1,
        borderTopColor: '#e0e0e0',
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
    },
    bar: {
        borderTopColor: 'white',
        borderTopWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    barSeparator: {
        borderRightWidth: 1,
        borderColor: BuddyColors.colorCinema
    },
    barItems: {
        flex: 1,
        padding: 18,
        alignItems: 'center',
    },
    barItemsCounter: {
        flex: 1,
        padding: 18,
        alignItems: 'center',
    },
    barItemsCounterBorder:{
        borderBottomWidth: 5,
        borderBottomColor: BuddyColors.colorButton,
    },
    barStayIcons: {
        flex: 1,
        padding: 18,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopColor: 'white',
    },
    barLevelIcons: {
        flex: 1,
        padding: 18,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopColor: 'white',
    },
    barItemsStay: {
        flex: 7,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopColor: 'white',
    },
    barItemsCancelStay: {
        flex: 3,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    barItemsLevel: {
        flex: 7,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopColor: 'white',
    },
    barItemsCancelLevel: {
        flex: 3,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    counterOpacity:{
        width: Dimensions.get('window').width / 3.1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    barTop: {
        color: BuddyColors.colorCinema,
        fontSize: 24,
        fontWeight: '700',
    },
    barTopActive: {
        color: BuddyColors.colorButton,
        fontSize: 12,
        fontWeight: '700',
    },
    textSubtitle: {
        color: BuddyColors.colorOthers,
        fontSize: 11,
        fontWeight: '700',
    },
    textActivitiesCounter: {
        color: BuddyColors.colorOthers,
        fontSize: 13,
        fontWeight: '700',
        alignSelf: 'center',
    },
    textActivitiesCounterActive: {
        color: BuddyColors.colorBack,
        fontSize: 13,
        fontWeight: '700',
        alignSelf: 'center',
    },
    textActivities: {
        color: BuddyColors.colorOthers,
        fontSize: 11,
        fontWeight: '400',
        alignSelf: 'center',
    },
    textActivitiesActive: {
        color: BuddyColors.colorBack,
        fontSize: 11,
        fontWeight: '400',
        alignSelf: 'center',
    },
    textPoints: {
        color: BuddyColors.colorButton,
        fontSize: 25,
        fontWeight: '400',
    },
    barBottom: {
        color: BuddyColors.colorCinema,
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 10,
    },
    buttonContainer: {
        backgroundColor: BuddyColors.colorButton,
        borderRadius: 5,
        padding: 10,
        height: 30,
        justifyContent : 'center',
  },
     activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
    indicator: {
        height: 24,
        alignSelf: 'center',
   },
    indicatorTitle: {
        padding: 20,
        height: 40,
        alignSelf: 'center',
   },
    barTopLogout: {
        color: BuddyColors.colorCinema,
        fontSize: 12,
        fontWeight: '700',
    },
    shadow : {
        shadowColor: BuddyColors.colorButton,
        shadowOffset: { "width": 0, "height": 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    cardShadow : {
        shadowColor: '#000',
        shadowOffset: { "width": 0, "height": 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

function formatDateToDisplay(sdate) {
    let date = new Date(sdate);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

function getAge(birthdate) {
    let birthday = new Date(birthdate); 
    var today = new Date();
    var thisYear = 0;
    if (today.getMonth() < birthday.getMonth()) {
        thisYear = 1;
    } else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
        thisYear = 1;
    }
    var age = today.getFullYear() - birthday.getFullYear() - thisYear;
    return age;
}

function getDateDay(theDate){
        let newDate = new Date(theDate); 
        var dateDay = newDate.getDate();
        return dateDay;
}

function getDateMonth(theDate){
        let newDate = new Date(theDate); 
        var dateMonth = newDate.getMonth() + 1;
        if (dateMonth == 1) {dateMonth = 'Janv'}
        if (dateMonth == 2) {dateMonth = 'Fev'}
        if (dateMonth == 3) {dateMonth = 'Mars'}
        if (dateMonth == 4) {dateMonth = 'Avr'}
        if (dateMonth == 5) {dateMonth = 'Mai'}
        if (dateMonth == 6) {dateMonth = 'Juin'}
        if (dateMonth == 7) {dateMonth = 'Juil'}
        if (dateMonth == 8) {dateMonth = 'Aout'}
        if (dateMonth == 9) {dateMonth = 'Sept'}
        if (dateMonth == 10) {dateMonth = 'Oct'}
        if (dateMonth == 11) {dateMonth = 'Nov'}
        if (dateMonth == 12) {dateMonth = 'Déc'}
        return dateMonth;
}

function getAddress1(address){
    let fullAddress = address;
    var address1= address.split(',')[0];
    return address1;
}

function getAddress2(address){
    let fullAddress = address;
    var address2= address.split(',')[1] + ',' + address.split(',')[2];
    return address2;
}

function select(store) {
    if (store.stay.successDelete) {
        return { deleteStay: true };
    }
    return {};
}

module.exports = connect(select)(ProfileView);
