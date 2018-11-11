import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component{
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: this.props.text

    };
    render(){
        const { isCompleted, isEditing, toDoValue} = this.state;
        const { text } = this.props;
     return <View style={styles.container}>
         <View style={styles.column}>
           <TouchableOpacity onPress={this._toggleComplete}>
             <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
             {/* isCompleted ? styles.completedCircle : styles.uncompletedCircle 에서 Completed면 completedCircle(#bbb)를, 아니면 uncompletedCircle(#F23657)을 보여주는 것. 각각의 경우에 의해 색이 결정되므로 기존의 Circle에는 색을 지정하지 않았다. */}
           </TouchableOpacity>
           {isEditing ? 
           <TextInput 
           style={[
               styles.text, 
               styles.input, 
               isCompleted ? styles.completedText : styles.unCompletedText
            ]} 
            value={toDoValue}   
            multiline={true}
            onChangeText={this._controllInput} 
            returnKeyType={"done"}
            onBlur={this._finishEditing} 
            underlineColorAndroid={"#fff"} /> : <Text
               style={[
                 styles.text,
                 isCompleted
                   ? styles.completedText
                   : styles.unCompletedText
               ]}
             >
               {text}
             </Text>}
         </View>
         {/* isEditin ? -> 이 말은 에디팅 중이라면 Check!를 보여주는 것이고 그렇지 않다면 Edit!과 Del!을 보여주는 것. */}
         {isEditing ? <View style={styles.actions}>
             <TouchableOpacity onPressOut={this._finishEditing}>
               <View style={styles.actionContainer}>
                 <Text style={styles.actionText}>Check!</Text>
               </View>
             </TouchableOpacity>
           </View> : <View style={styles.actions}>
           {/* onPressOut으로 _startEditing 이 설정되어 있고, 이것은 isEditing: true 이므로 이 버튼을 누르면 isEditing이 되어서 Check!가 나오게 된다. 위의 onPressout={this._finishEditing}도 같다. */}
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
           </View>}
       </View>;
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
            toDoValue: text
        });
    };
    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };
    _controllInput = text => {
        this.setState({
            toDoValue: text    
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
    marginVertical: 15
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