import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';

import ActionButton from './ActionButton';
import CategoryButton from './CategoryButton';
import UnderCategoryItem from './UnderCategoryItem';
const BuddyColors = require('../../common/BuddyColors');

const {height, width} = Dimensions.get('window');

const iconDefault = "close";

class CreateEventButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            launchButtons: false,
            centerButtonIcon: iconDefault,
            centerButtonColor: 'transparent',
            showPopup: false,
            displayDisappearAction:false,
            categSelected:false,

        };

        this.toogleCategoryButton = this.toogleCategoryButton.bind(this);
        this.selectedItem = this.selectedItem.bind(this);
        this.onCancel = this.onCancel.bind(this);

    }

    componentWillUnmount() {}

    componentWillReceiveProps(nextProps) {
        if (nextProps.active !== this.state.active) {
            this.setState({ active: nextProps.active });
        }
    }

    toogleCategoryButton() {
        this.setState({ launchButtons: !this.state.launchButtons });
        if (!this.state.launchButtons) {
            this.setState({ centerButtonColor: BuddyColors.lightBackground })
            this.setState({ showPopup: !this.state.showPopup })
        }
    }

    selectedItem(iconName, color) {
        this.setState({ centerButtonIcon: iconName });
        this.setState({ centerButtonColor: color })
    }

    onCancel(){
        this.setState({categSelected:false, displayDisappearAction: false});
    }

    render() {
        return (
            <View style={styles.container}>
              <ActionButton onEndAction={this.toogleCategoryButton} categSelected={this.state.categSelected} displayDisappearAction={this.state.displayDisappearAction} startDegree={270} endDegree={270} buttonColor={BuddyColors.colorButton} size={50} itemSize={width/4.3} backdrop={(<View style={[styles.backDrop]}><Text style={[styles.descriptif, {fontSize: width/12, fontWeight: '400', color: 'white'}]}>{'Crée une activité'.toUpperCase()}</Text><Text style={[{fontSize: 14, fontWeight: '300', color: 'white', textAlign:'center', marginTop:10, marginLeft:width/10, width:width/1.25}]}>Indique à tous les buddies l'activité que tu souhaites effectuer</Text></View>)} >
                <ActionButton.Item buttonColor='white' title="" >
                    <CategoryButton onCancel={()=>this.onCancel()} onCategSelected={()=>this.setState({categSelected:true, displayDisappearAction: true})} isSelected={false} iconName={this.state.centerButtonIcon} centerButtonColor={this.state.centerButtonColor} launchButton={this.state.launchButtons} startDegree={1} endDegree={360} buttonColor={BuddyColors.lightBackground} size={50} itemSize={width/4.3} backdrop={(<View style={[styles.backDrop]}><Text style={[{textAlign:"center"}]}/></View>)}>
                        <CategoryButton.Item buttonColor='#EF9A9A' iconName="local-pizza" keyWord="Repas" title="Repas" onPress={() => {this.selectedItem('local-pizza', '#EF9A9A')}}>
                            <UnderCategoryItem buttonColor='#EF9A9A' keyWord="Fast-food" title="Fast-food" onPress={() => {this.selectedItem('local-pizza', '#EF9A9A')}} />
                            <UnderCategoryItem buttonColor='#df8892' keyWord="Exotique" title="Exotique" onPress={() => {this.selectedItem('local-pizza', '#EF9A9A')}} />
                            <UnderCategoryItem buttonColor='#e57f8a' keyWord="Gastronomique" title="Gastrono-mique" onPress={() => {this.selectedItem('local-pizza', '#EF9A9A')}} />
                            <UnderCategoryItem buttonColor='#e57f8a' keyWord="Brasserie" title="Brasserie" onPress={() => {this.selectedItem('local-pizza', '#EF9A9A')}} />
                            <UnderCategoryItem buttonColor='#EF9A9A' keyWord="Tapas" title="Tapas" onPress={() => {this.selectedItem('local-pizza', '#EF9A9A')}} />
                            <UnderCategoryItem buttonColor='#e57f8a' keyWord="Fruits de mer" title="Fruits de mer" onPress={() => {this.selectedItem('local-pizza', '#EF9A9A')}} />
                            <UnderCategoryItem buttonColor='#e57f8a' keyWord="Végétarien" title="Végétarien" onPress={() => {this.selectedItem('local-pizza', '#EF9A9A')}} />
                            <UnderCategoryItem buttonColor='#e57f8a' keyWord="Autre" title="Autre" onPress={() => {this.selectedItem('local-pizza', '#EF9A9A')}} />
                        </CategoryButton.Item>
                        <CategoryButton.Item buttonColor='#B39DDB' iconName="local-bar" keyWord="Bar / Club" title="Bar / Club" onPress={() => {this.selectedItem('local-bar', '#B39DDB')}}>
                            <UnderCategoryItem buttonColor='#B39DDB' keyWord="Bar" title="Bar" onPress={() => {this.selectedItem('local-bar', '#B39DDB')}} />
                            <UnderCategoryItem buttonColor='#ac93d9' keyWord="Pub" title="Pub" onPress={() => {this.selectedItem('local-bar', '#B39DDB')}} />
                            <UnderCategoryItem buttonColor='#a488d7' keyWord="Boîte de nuit" title="Boîte de nuit" onPress={() => {this.selectedItem('local-bar', '#B39DDB')}} />
                            <UnderCategoryItem buttonColor='#ac93d9' keyWord="Bar à vin" title="Bar à vin" onPress={() => {this.selectedItem('local-bar', '#B39DDB')}} />
                            <UnderCategoryItem buttonColor='#B39DDB' keyWord="Bar à cocktail" title="Bar à cocktail" onPress={() => {this.selectedItem('local-bar', '#B39DDB')}} />
                            <UnderCategoryItem buttonColor='#ac93d9' keyWord="Bar à Mojito" title="Bar à Mojito" onPress={() => {this.selectedItem('local-bar', '#B39DDB')}} />
                            <UnderCategoryItem buttonColor='#a488d7' keyWord="Irlandais" title="Irlandais" onPress={() => {this.selectedItem('local-bar', '#B39DDB')}} />
                            <UnderCategoryItem buttonColor='#ac93d9' keyWord="Autre" title="Autre" onPress={() => {this.selectedItem('local-bar', '#B39DDB')}} />
                        </CategoryButton.Item>
                        <CategoryButton.Item buttonColor='#FFE082' iconName="directions-run" keyWord="Activité sportive" title="Activité sportive" onPress={() => {this.selectedItem('directions-run', '#FFE082')}}>
                            <UnderCategoryItem buttonColor='#FFE082' keyWord="Tennis" title="Tennis" onPress={() => {this.selectedItem('directions-run', '#FFE082')}} />
                            <UnderCategoryItem buttonColor='#fcd96e' keyWord="Course à pied" title="Course à pied" onPress={() => {this.selectedItem('directions-run', '#FFE082')}} />
                            <UnderCategoryItem buttonColor='#fcd663' keyWord="Badminton" title="Badminton" onPress={() => {this.selectedItem('directions-run', '#FFE082')}} />
                            <UnderCategoryItem buttonColor='#fcd96e' keyWord="Squash" title="Squash" onPress={() => {this.selectedItem('directions-run', '#FFE082')}} />
                            <UnderCategoryItem buttonColor='#FFE082' keyWord="Fitness" title="Fitness" onPress={() => {this.selectedItem('directions-run', '#FFE082')}} />
                            <UnderCategoryItem buttonColor='#fcd96e' keyWord="Piscine" title="Piscine" onPress={() => {this.selectedItem('directions-run', '#FFE082')}} />
                            <UnderCategoryItem buttonColor='#fcd663' keyWord="Futsal" title="Futsal" onPress={() => {this.selectedItem('directions-run', '#FFE082')}} />
                            <UnderCategoryItem buttonColor='#fcd96e' keyWord="Autre" title="Autre" onPress={() => {this.selectedItem('directions-run', '#FFE082')}} />
                        </CategoryButton.Item>
                        <CategoryButton.Item buttonColor='#FFCC80' iconName="receipt" keyWord="Evenement sportif" title="Evenement sportif" onPress={() => {this.selectedItem('receipt', '#FFCC80')}}>
                            <UnderCategoryItem buttonColor='#fec878' keyWord="Au stade" title="Au stade" onPress={() => {this.selectedItem('receipt', '#FFCC80')}} />
                            <UnderCategoryItem buttonColor='#fcc471' keyWord="Dans un bar" title="Dans un bar" onPress={() => {this.selectedItem('receipt', '#FFCC80')}} />
                            <UnderCategoryItem buttonColor='#fcc169' keyWord="Autre" title="Autre" onPress={() => {this.selectedItem('receipt', '#FFCC80')}} />
                        </CategoryButton.Item>
                        <CategoryButton.Item buttonColor='#90CAF9' iconName="movie" keyWord="Cinéma" title="Cinéma" onPress={() => {this.selectedItem('movie', '#90CAF9')}}>
                        </CategoryButton.Item>
                        <CategoryButton.Item buttonColor='#1DE9B6' iconName="palette" keyWord="Culture" title="Culture" onPress={() => {this.selectedItem('palette', '#1DE9B6')}}>
                            <UnderCategoryItem buttonColor='#1DE9B6' keyWord="Musée" title="Musée" onPress={() => {this.selectedItem('palette', '#1DE9B6')}} />
                            <UnderCategoryItem buttonColor='#16e8b3' keyWord="Opéra" title="Opéra" onPress={() => {this.selectedItem('palette', '#1DE9B6')}} />
                            <UnderCategoryItem buttonColor='#11e8b2' keyWord="Théâtre" title="Théâtre" onPress={() => {this.selectedItem('palette', '#1DE9B6')}} />
                            <UnderCategoryItem buttonColor='#0be7b0' keyWord="Concert" title="Concert" onPress={() => {this.selectedItem('palette', '#1DE9B6')}} />
                            <UnderCategoryItem buttonColor='#06e7af' keyWord="Visite de la ville" title="Visite de la ville" onPress={() => {this.selectedItem('palette', '#1DE9B6')}} />
                            <UnderCategoryItem buttonColor='#01e7ad' keyWord="Autre" title="Autre" onPress={() => {this.selectedItem('palette', '#1DE9B6')}} />
                        </CategoryButton.Item>
                        <CategoryButton.Item buttonColor='#F48FB1' iconName="casino" keyWord="Jeux" title="Jeux" onPress={() => {this.selectedItem('casino', '#F48FB1')}}>
                            <UnderCategoryItem buttonColor='#F48FB1' keyWord="Bowling" title="Bowling" onPress={() => {this.selectedItem('casino', '#F48FB1')}} />
                            <UnderCategoryItem buttonColor='#f181a7' keyWord="Billard" title="Billard" onPress={() => {this.selectedItem('casino', '#F48FB1')}} />
                            <UnderCategoryItem buttonColor='#f0719c' keyWord="Laser Game" title="Laser Game" onPress={() => {this.selectedItem('casino', '#F48FB1')}} />
                            <UnderCategoryItem buttonColor='#f181a7' keyWord="Escape Game" title="Escape Game" onPress={() => {this.selectedItem('casino', '#F48FB1')}} />
                            <UnderCategoryItem buttonColor='#F48FB1' keyWord="Karting" title="Karting" onPress={() => {this.selectedItem('casino', '#F48FB1')}} />
                            <UnderCategoryItem buttonColor='#f181a7' keyWord="Casino" title="Casino" onPress={() => {this.selectedItem('casino', '#F48FB1')}} />
                            <UnderCategoryItem buttonColor='#f0719c' keyWord="Simulateur" title="Simulateur" onPress={() => {this.selectedItem('casino', '#F48FB1')}} />
                            <UnderCategoryItem buttonColor='#f181a7' keyWord="Autre" title="Autre" onPress={() => {this.selectedItem('casino', '#F48FB1')}} />
                        </CategoryButton.Item>
                        <CategoryButton.Item buttonColor='#B0BEC5' iconName="add-circle-outline" keyWord="Autre" title="Autre" onPress={() => {this.selectedItem('add-circle-outline', '#B0BEC5')}}>
                        </CategoryButton.Item>
                    </CategoryButton>
                </ActionButton.Item>
              </ActionButton>
            </View>
        );
    }
}


CreateEventButton.propTypes = {
    active: PropTypes.bool,
};

CreateEventButton.defaultProps = {
    active: false,
};

const styles = StyleSheet.create({
    backDrop: {
        height: height +20,
        width: width,
        position: "absolute",
        marginTop: -height,
        marginLeft: -width/2,
        backgroundColor: 'rgba(80,99,138,0.97)',
    },
    descriptif:{
        textAlign:"center", 
        marginTop:height/12
    }
});

module.exports = CreateEventButton;
