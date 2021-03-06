import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Sender from '../components/Conversation/components/Sender';
import { store, initStore } from '../../../store/store';
import LocalStorageMock from '../../../../mocks/localStorageMock';


describe('Metadata store affect input behavior', () => {
  const localStorage = new LocalStorageMock();
  const stubSocket = jest.fn();
  initStore('dummy', 'dummy', stubSocket, localStorage);
  const senderCompoment = mount(
    <Provider store={store}>
      <Sender
        sendMessage={() => {}}
        inputTextFieldHint="dummy"
        disabledInput={false}
      />
    </Provider>
  );

  beforeEach(() => {
    store.dispatch({ type: 'CLEAR_METADATA' });
    senderCompoment.update(); // propagate new store to the compoment
  });

  it('should disable the input', () => {
    expect(senderCompoment.find('.new-message')).toHaveLength(1);
    expect(senderCompoment.find('.new-message').prop('disabled')).toEqual(false);
    store.dispatch({ type: 'SET_USER_INPUT', userInputState: 'disable' });
    senderCompoment.update(); // propagate new store to the compoment
    expect(senderCompoment.find('.new-message')).toHaveLength(1);
    expect(senderCompoment.find('.new-message').prop('disabled')).toEqual(true);
  });


  it('should hide the input', () => {
    expect(senderCompoment.find('.new-message')).toHaveLength(1);
    expect(senderCompoment.find('.new-message').prop('disabled')).toEqual(false);
    store.dispatch({ type: 'SET_USER_INPUT', userInputState: 'hide' });
    senderCompoment.update(); // propagate new store to the compoment
    expect(senderCompoment.find('.new-message')).toHaveLength(0);
  });
});

