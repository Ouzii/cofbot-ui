import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native'
import { Button, RadioButton } from 'react-native-material-ui'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Snackbar } from 'react-native-paper'

export default function App() {
  const [summoned, setSummoned] = useState(false)
  const [schedule, setSchedule] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [date, setDate] = useState(new Date())
  const [modal, setModal] = useState(false)
  const [place, setPlace] = useState(1)
  const [times, setTimes] = useState([])
  const [reserved, setReserved] = useState(false)

  const summon = () => {
    setSummoned(true)
    setTimeout(() => {
      setSummoned(false)
    }, 30000)
  }

  const isReserved = date => {
    times.map(time => {
      if (time.toLocaleTimeString() == date.toLocaleTimeString()) {
        setReserved(true)
      }
    })
    setTimes([...times, date])
  }

  return (
    <View style={styles.container}>
      <View>
        {summoned ? (
          <Button
            text={`ETA\n<1min\nCancel`}
            style={{
              container: {
                backgroundColor: '#1CC8FF',
                borderRadius: 100,
                width: 200,
                height: 200
              },
              text: { textAlign: 'center' }
            }}
            onPress={() => setSummoned(!summoned)}
          ></Button>
        ) : (
          <Button
            text='Summon'
            style={{
              container: {
                backgroundColor: '#6CFF38',
                borderRadius: 100,
                width: 200,
                height: 200
              }
            }}
            onPress={() => summon()}
          ></Button>
        )}
      </View>
      <View>
        <Button
          text='Schedule'
          onPress={() => {
            setSchedule(true)
            setReserved(false)
          }}
        ></Button>
        <DateTimePicker
          isVisible={schedule}
          mode='time'
          onConfirm={date => setDate(date)}
          onCancel={() => setSchedule(false)}
          onHideAfterConfirm={() => {
            setPlace(1)
            setModal(true)
            setSchedule(false)
          }}
        />
        <Modal
          animationType='fade'
          transparent={false}
          visible={modal}
          onRequestClose={() => {
            setModal(false)
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <RadioButton
              checked={place === 1}
              value={1}
              label='Room 123'
              onSelect={() => setPlace(1)}
            ></RadioButton>
            <RadioButton
              checked={place === 2}
              value={2}
              label='Room 231'
              onSelect={() => setPlace(2)}
            ></RadioButton>
            <RadioButton
              checked={place === 3}
              value={3}
              label='Room 321'
              onSelect={() => setPlace(3)}
            ></RadioButton>

            <Button
              text='Cancel'
              onPress={() => {
                setPlace(1)
                setModal(false)
              }}
            ></Button>
            <Button
              text='OK'
              onPress={() => {
                isReserved(date)
                setModal(false)
                setSnackbar(true)
              }}
            ></Button>
          </View>
        </Modal>
      </View>
      <Snackbar
        visible={snackbar}
        onDismiss={() => {
          setSnackbar(false)
        }}
        duration={6000}
      >
        {reserved
          ? 'Robot is already scheduled for this time'
          : `Robot scheduled for ${date.toLocaleTimeString()} in room ${
              place === 1 ? '123' : place === 2 ? '231' : '321'
            }`}
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
})
