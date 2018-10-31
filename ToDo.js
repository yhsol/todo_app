import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component{
    state = {
        isEditing: false,
        isCompleted: false,
        ToDovalue: this.props.text

    };
    render(){
        const { isCompleted, isEditing, ToDovalue} = this.state;
        const { text } = this.props;
     return ( <View style={styles.container}>
         <View style={styles.column}>
           <TouchableOpacity onPress={this._toggleComplete}>
             <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
           </TouchableOpacity>
           {isEditing ? (
           <TextInput 
            style={[
                styles.text,
                styles.input, 
                isCompleted ? styles.completedText : styles.unCompletedText]} 
            value={ToDovalue} 
            value={this.state.text}
            multiline={true} 
            onChangeText={this._controllInput}
            returnKeyType={"done"}
            onBlur={this._finishEditing}
            underlineColorAndroid={"#fff"} 
            />
            ) : (
            <Text
               style={[
                 styles.text,
                 isCompleted
                   ? styles.completedText
                   : styles.unCompletedText
               ]}
             >
               {text}
           </Text>
           )}
         </View>
         {isEditing ? (
            <View style={styles.actions}>
             <TouchableOpacity onPressOut={this._finishEditing}>
               <View style={styles.actionContainer}>
                 <Text style={styles.actionText}>Check!</Text>
               </View>
             </TouchableOpacity>
           </View>
           ) : (
           <View style={styles.actions}>
             <TouchableOpacity onPressOut={this._startEditing}>
               <View style={styles.actionContainer}>
                 <Text style={styles.actionText}>Edit!</Text>
               </View>
             </TouchableOpacity>
             <TouchableOpacity>
               <View style={styles.actionContainer}>
                 <Text style={styles.actionText}>Del!</Text>
               </View>
             </TouchableOpacity>
           </View>)}
       </View>
     );
    }
    _toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };
    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            ToDoValue: text
        });
    };
    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };
    _controllInput = text => {
        this.setState({
            ToDoValue: text    
        });
    };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"

  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20
  },
  completedText: {
      color: "#bbb",
      textDecorationLine: "line-through"
  },
  unCompletedText: {
      color: "#353839"
  },
  column: {
      flexDirection: "row",
      alignItems: "center",
      width: width / 2
  },
  actions: {
      flexDirection: "row"
  },
  actionContainer: {
      marginVertical: 10,
      marginHorizontal: 10
  },
  input : {
      marginVertical: 15,
      width: width / 2,
      paddingBottom: 5
  }
});