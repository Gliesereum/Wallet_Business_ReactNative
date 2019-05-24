import * as React from 'react';
import {View, Keyboard, Text, StyleSheet} from 'react-native';
import {Dialog, Portal, TextInput, HelperText, Checkbox} from 'react-native-paper';


const styles = StyleSheet.create({
  itemOption: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  }
});


export default class MyComponent extends React.Component {

  state = {visible: false};

  _showDialog = () => {
    Keyboard.dismiss();
    this.setState({visible: true});
  };

  _hideDialog = () => this.setState({visible: false});

  changeHandle = value => () => {
    this.props.onChange(value);
    this._hideDialog();
  };

  renderItemOption = option => {
    const checked = this.props.value === option.key;
    return (
      <View key={option.key} style={styles.itemOption}  onPress={this.changeHandle(option.key)}>
        <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={this.changeHandle(option.key)}/>
        <Text>{option.label}</Text>
      </View>
    );
  };

  renderSelectField = () => {
    const {value, label, error, onChange, options} = this.props;
    const [inputValue] = options.filter(item => item.key === value);
    const renderOptions = options.map(this.renderItemOption);
    return (
      <View>
        <View>
          <TextInput
            label={label}
            value={inputValue.label}
            onChangeText={onChange}
            mode={"outlined"}
            error={error}
            onFocus={this._showDialog}
          />
          <HelperText type="error" visible={true}>
          </HelperText>
        </View>

        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
            <Dialog.Title>{label}</Dialog.Title>
            <Dialog.Content>
              {renderOptions}
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    );
  };

  render() {
    return this.renderSelectField();
  }
}
