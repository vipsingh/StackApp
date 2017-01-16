import Alert from 'react-s-alert';

export default {
  success: function(message, op) {
    Alert.success(message, op);
  },
  warn: function(message, op) {
    Alert.warning(message, op);
  },
  info: function(message, op) {
    Alert.info(message, op);
  },
  error: function(message, op) {
    Alert.error(message, op);
  },
  closeAll:function() {
    Alert.closeAll();
  }
};
