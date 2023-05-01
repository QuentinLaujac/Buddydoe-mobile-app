import React, {Component} from 'react';
import {
    Animated,
    ActivityIndicator,
    Dimensions,
    Easing,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native';


import Icon from 'react-native-vector-icons/MaterialIcons';
import GroupRadioButton from '../../common/button/groupRadioButton/GroupRadioButton';
import {createEvent} from '../../actions';

var DuoSlider = require("../../common/DuoSlider");
var BuddyDatePicker = require("../../common/button/datePicker/BuddyDatePicker");
var SearchActivity = require('./SearchActivity');
var BuddyColors = require('../../common/BuddyColors');

var { connect } = require('react-redux');

const {width, height} = Dimensions.get('window');

class CreateEventModal extends Component {

    constructor(props) {
        super(props);
        let dateJ = new Date();
        this.state = {
            org_width: 50,
            org_height: 50,
            

            top_width: new Animated.Value(50),
            top_height: new Animated.Value(50),
            bottom_width: new Animated.Value(width - 32),
            bottom_height: new Animated.Value(height),
            content_height: new Animated.Value(0),

            top_pan: new Animated.ValueXY(),
            bottom_pan: new Animated.ValueXY(),
            content_pan: new Animated.ValueXY(),

            content_opac: new Animated.Value(0),
            button_opac: new Animated.Value(0),

            TopBorderRadius: 25,
            cardTopBorderRadius : 5,

            activate: false,
            activated: false,

            offset: 0,

            pressed: false,
            displaySearchModal:false,


            titre : "",
            lieu: "",
            details:"",
            dateDeb : dateJ,
            heureDeb : new Date(dateJ.getFullYear(), dateJ.getMonth(), dateJ.getDate(), 19, 0, 0),
            quiParticipe: "lesDeux",
            ageDeb:18,
            ageFin:99,
            nombreMin:2,
            nombreMax:20,
        };

        this._onPress = this._onPress.bind(this);
        this.calculateOffset = this.calculateOffset.bind(this);
        this.activate = this.activate.bind(this);
        this.onEndSearch = this.onEndSearch.bind(this);
    }

    componentDidMount(){
        setTimeout(() => {
          this._onPress();
        }, 1);
    }


    _onPress() {
        this.props.onClick();
        this.setState({pressed: !this.state.pressed});
        this.calculateOffset();
    }


    grow() {
        this.setState({TopBorderRadius: 25});

        Animated.parallel([
            Animated.spring(
                this.state.top_width,
                {
                    toValue: width
                }
            ).start(),
            Animated.spring(
                this.state.top_height,
                {
                    toValue: height/1.7
                }
            ).start(),
            Animated.spring(
                this.state.bottom_height,
                {
                    toValue: height/2 + 50
                }
            ).start(),
            Animated.spring(
                this.state.content_height,
                {
                    toValue: height/1.2
                }
            ).start(),
            Animated.spring(
                this.state.top_pan,
                {
                    toValue: {
                        x: 0,
                        y: -(this.state.offset)
                    }
                }
            ).start(),
            Animated.spring(
                this.state.content_pan,
                {
                    toValue: {
                        x: 0,
                        y: -(height/2  + this.state.offset)
                    }
                }
            ).start(),
            Animated.spring(
                this.state.bottom_pan,
                {
                    toValue: {
                        x: 0,
                        y: -(height/2+ this.state.offset)
                    }
                }
            ).start(),
            Animated.timing(
                this.state.content_opac,
                {
                    toValue: 1
                }
            ).start(),
            Animated.timing(
                this.state.button_opac,
                {
                    toValue: 1
                }
            ).start(),
        ])
    }

    shrink() {
        this.setState({TopBorderRadius: 5});
        Animated.parallel([
            Animated.spring(
                this.state.top_width,
                {
                    toValue: this.state.org_width
                }
            ).start(),
            Animated.spring(
                this.state.top_height,
                {
                    toValue: this.state.org_height
                }
            ).start(),
            Animated.spring(
                this.state.bottom_height,
                {
                    toValue: height/2
                }
            ).start(),
            Animated.spring(
                this.state.top_pan,
                {
                    toValue: {
                        x: 0,
                        y: 0
                    }
                }
            ).start(),
            Animated.spring(
                this.state.bottom_pan,
                {
                    toValue: {
                        x: 0,
                        y: 0
                    }
                }
            ).start(),
            Animated.spring(
                this.state.content_height,
                {
                    toValue: 0
                }
            ).start(),
            Animated.timing(
                this.state.content_opac,
                {
                    toValue: 0
                }
            ).start(),
            Animated.timing(
                this.state.button_opac,
                {
                    toValue: 0
                }
            ).start(),

        ])
    }


    calculateOffset() {
        if(this.refs.container) {
            this.refs.container.measure((fx, fy, width, height, px, py) => {
                this.setState({offset: py}, () => {
                    if(this.state.pressed) {
                        console.log('growing with offset', this.state.offset);
                        this.grow();
                    } else {
                        console.log('shrinking with offset', this.state.offset);
                        this.shrink();
                    }

                })
            });
        }
    }

    async activate() {
        this.setState({activate: 'loading'});
        let data = {
            theme : this.props.theme,
            subTheme : this.props.keyWord,
            titre :this.state.titre,
            lieu :this.state.lieu,
            details :this.state.details,
            dateDeb :this.state.dateDeb,
            heureDeb :this.state.heureDeb,
            quiParticipe :this.state.quiParticipe,
            ageDeb :this.state.ageDeb,
            ageFin :this.state.ageFin,
            nombreMin :this.state.nombreMin,
            nombreMax :this.state.nombreMax
        };
        const { dispatch } = this.props;
        await Promise.race([
            dispatch(createEvent(data)),
        ]);
    }


    onEndSearch(item) {
      this.setState({ lieu:item, nomLieu: item.name, displaySearchModal: false });
    }

    renderTop() {
        var back = <View style={{backgroundColor:BuddyColors.colorBack }}/>;

        return (
            <Animated.View 
                style={[styles.top, {
                height: this.state.top_height,
                transform: this.state.top_pan.getTranslateTransform(),
                backgroundColor:BuddyColors.colorBack 
            }]}>
                {back}
            </Animated.View>
        )
    }

    renderBottom() {
        let icon = this.state.activate === 'loading' && !this.props.created? <ActivityIndicator animating={true} color={BuddyColors.colorBack}/> : <Icon name="send" style={{color:BuddyColors.colorBack, fontSize:20}} />;
        let marginTopBulle = this.props.keyWord.toLowerCase() === "autre" ? -27.5 : -20;
        let marginBottomBulle = this.props.keyWord.toLowerCase() === "autre" ? 5 : 20;
        let title = this.props.keyWord.toLowerCase() === "autre" ? 
                        <View style={[{marginHorizontal:17, width:width-34, borderRadius: 5, backgroundColor:"white", left:-17, height:height/13.5, marginBottom:6}, styles.shadow]}>
                            <TextInput
                                ref="inputTitle"
                                style={{height: height/19.5, borderColor: 'gray', borderWidth:0, fontSize: height/37.5, fontWeight: '200', textAlign:'left', marginTop:height/97.5, marginLeft:10}}
                                placeholderTextColor="#bababa"
                                placeholder="Titre de l'activité"
                                onChangeText={(text) => this.setState({titre: text})}
                                value={this.state.text}
                            />
                        </View>
                        : <View style={{marginTop:-20}}/>;
        let infoSousTheme = (this.props.keyWord != this.props.theme)? " > "+this.props.keyWord : null;
        let maginWithoutTitle = this.props.keyWord.toLowerCase() === "autre" ? 0: height/13.5 + 6;
        return (
            <Animated.View style={[styles.bottom,
            {
                marginTop:-height/8,
                marginBottom:height/5,
                backgroundColor: BuddyColors.colorBack,
                opacity: this.state.content_opac,
                width: width,
                height: this.state.bottom_height,
                transform: this.state.bottom_pan.getTranslateTransform()
            }]}>
                <View>
                    <View style={[styles.header, styles.shadow, {width:width, height: height/10, marginLeft:-16, marginBottom:height/10.5-27}]} >
                         <View style={{marginTop:height/50}}>
                            <TouchableOpacity onPress={()=>{
                                this.props.onCancel();
                                }}>
                                <Animated.View style={{opacity: this.props.button_opac,  backgroundColor: 'white', width: 90, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: BuddyColors.colorBack, textAlign:'center', fontWeight: '500', fontSize: height/40}}>Annuler</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:height/50}}>
                            <View> 
                                <Text style={[styles.title, {fontSize: height/40}]}>{this.props.title}</Text>
                            </View>
                        </View>
                        <View style={{marginTop:height/50}} >
                            <TouchableOpacity onPress={()=>{this.props.onPress;this.activate()}}>
                                <Animated.View style={{opacity: this.props.button_opac,  backgroundColor: 'white',  width: 90, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}><Text style={{color: BuddyColors.colorBack, textAlign:'center', fontWeight: '500', fontSize: height/40, marginRight:5}}>Créer</Text>{icon}</View>
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row', backgroundColor:BuddyColors.colorBack}}>
                    <View style={{flex: 4}}>
                        <View style={{flexDirection: 'row', marginTop: marginTopBulle, marginBottom: marginBottomBulle}}>
                                <Animated.View style={[{opacity: this.props.button_opac, borderColor: this.props.color,  backgroundColor:this.props.color,
                                  marginTop: 10, marginRight:5, borderWidth: 0.5, borderRadius: 5, height: 30,
                                  alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}]}>
                                    <Icon name={this.props.iconTheme} style={{marginLeft:10, marginRight:5, color:'white', fontSize: width/27}} />
                                    <Text style={{marginRight:10, color: 'white', fontWeight: '400', fontSize: width/27}}>
                                        {this.props.theme} {infoSousTheme}
                                    </Text>
                                </Animated.View>
                        </View>
                        {title}
                        <View style={[{marginHorizontal:17, width:width-34, borderRadius: 5, backgroundColor:"white", left:-17, height:height/13.5, marginTop:maginWithoutTitle/2, marginBottom:1}, styles.shadow]}>
                            <TextInput
                                ref="search"
                                style={{height: height/19.5, borderColor: 'gray', borderWidth:0, fontSize: height/37.5, fontWeight: '400', textAlign:'left', marginTop:height/97.5, marginLeft:10}}
                                placeholderTextColor="#bababa"
                                placeholder="Lieu"
                                onChangeText={(text) => this.setState({nomLieu : text})}
                                blurOnSubmit={true}
                                onFocus={()=> {
                                    this.setState({displaySearchModal:true});
                                    this.refs.search.blur()
                                }}
                                value={this.state.nomLieu}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:-10}}>
                            <BuddyDatePicker date={this.state.dateDeb} mode="date" placeholder="Aujourd'hui" format="DD/MM/YYYY" onDateChange={(date) => {this.setState({dateDeb: date})}} color={BuddyColors.colorBack} shadowColor={'#000'} borderColor={"white"} width={(width-32)/2} marginLeft={10} marginRight={-6.75}/>
                            <BuddyDatePicker date={this.state.heureDeb} mode="time" placeholder="19:00" format="HH:mm" onDateChange={(date) => {this.setState({heureDeb: date})}} color={BuddyColors.colorBack} shadowColor={'#000'} borderColor={"white"} width={(width-32)/2} marginLeft={-6.75} marginRight={10}/>
                        </View>
                    </View>
                </View>
            </Animated.View>
        )
    }

    renderContent() {
        if(!this.state.pressed) {
            return
        }
        return (
            <Animated.View style={{opacity: this.state.content_opac, marginTop: -height/6 -75, width: width, height: this.state.content_height, zIndex: 10,
            backgroundColor: this.props.color, transform: this.state.content_pan.getTranslateTransform()}}>
                <View style={{backgroundColor: 'white', flex: 1, padding: 16}}>
                    <Text style={[{fontSize: height/60, marginTop:0}, styles.textSubtitle]}>PARTICIPANTS</Text>
                        <GroupRadioButton>
                            <GroupRadioButton.Item onPress={()=>this.setState({quiParticipe : "homme"})} button_opac={this.state.button_opac} width={(width-64) / 3} title="homme" color={BuddyColors.colorBack} isSelected={false} />
                            <GroupRadioButton.Item onPress={()=>this.setState({quiParticipe : "femme"})} button_opac={this.state.button_opac} width={(width-64) / 3} title="femme" color={BuddyColors.colorBack} isSelected={false} />
                            <GroupRadioButton.Item onPress={()=>this.setState({quiParticipe : "lesDeux"})} button_opac={this.state.button_opac} width={(width-64) / 3} title="les deux" color={BuddyColors.colorBack} isSelected={true} />
                        </GroupRadioButton>
                    <Text style={[{fontSize:  height/60, marginTop:height/30}, styles.textSubtitle]}>ÂGE</Text>
                    <DuoSlider onChange={(min, max) => this.setState({ageDeb:min, ageFin:max})} color={BuddyColors.colorBack} width={width} button_opac={this.state.button_opac} minDefaultValue={18} maxDefaultValue={99} step={5} offset={2}/>
                    <Text style={[{fontSize:  height/60, marginTop:height/20 - 30}, styles.textSubtitle]}>NOMBRE</Text>
                    <DuoSlider onChange={(min, max) => this.setState({nombreMin:min, nombreMax:max})} color={BuddyColors.colorBack} width={width} button_opac={this.state.button_opac} minDefaultValue={2} maxDefaultValue={20} step={1} offset={0}/>
                    <TouchableWithoutFeedback onPress={()=>{this.refs.detailInput.focus()}}>
                        <View style={[{marginHorizontal:10, width:width-20, borderRadius: 5, borderColor:BuddyColors.colorBack, backgroundColor:"white", left:-17, minHeight:height/6.75}, styles.darkerShadow]}>
                            <TextInput
                                ref="detailInput"
                                style={[styles.textSubtitle, {borderColor: 'gray', borderWidth:0, color:'black', fontSize: height/60, textAlign:'left', marginTop:height/97.5, marginLeft:10} ]}
                                placeholderTextColor={BuddyColors.colorOthers}
                                placeholder="DETAILS"
                                multiline = {true}
                                numberOfLines = {3}
                                onChangeText={(text) => this.setState({details : text})}
                                value={this.state.text}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Animated.View>
        )
    }

    render() {
        return (
            <View>
                <View style={[styles.container]}>
                    <SearchActivity 
                        onEndEditing={this.onEndSearch}
                        displayModal={this.state.displaySearchModal} 
                        color={BuddyColors.colorBack}
                        keyWord={this.props.keyWord}
                    />
                    <TouchableWithoutFeedback onPress={()=>{this.refs.detailInput.blur()}} >
                        <View ref="container"
                              style={[{alignItems: 'center'}]}>
                            {this.renderTop()}
                            {this.renderBottom()}
                            {this.renderContent()}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}

function select(store) {
    if(store.event.successCreated) {
        this.props.onCancel();
        return {created:true};
    }else if(store.event.hasError) {
        alert("Erreur lors de la creation de l'activité");
        return {created:false}; 
    }
    return {created:false};
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '700',
        color: BuddyColors.colorBack,
        textAlign: 'center'
    },
    header: {
        backgroundColor: "#FFFFFF",
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        position: 'relative',
        justifyContent: 'space-between'
    },
    shadow : {
        shadowColor: '#000',
        shadowOffset: { "width": 0, "height": 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    darkerShadow : {
        shadowColor: BuddyColors.colorBack,
        shadowOffset: { "width": 0, "height": 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 16,
        marginTop: 16,
    },
    textSubtitle: {
        color: BuddyColors.colorOthers,
        fontSize: 11,
        fontWeight: '700',
    },
    bottom: {
        marginTop: -10,
        padding: 16,
    },
})

export default connect(select)(CreateEventModal);

