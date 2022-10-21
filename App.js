import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import database from "./firebase";
import { onValue, push, ref, remove } from 'firebase/database';


export default function App() {

  const [food, setFood] = useState('')
  const [amount, setAmount] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    const listRef = ref(database, '/list');

      onValue(listRef , snapshot => {
        const data = snapshot.val();
        const products = data ? Object.keys(data).map(key => ({key, ...data[key] })) : [];
        setList(products);
        console.log(products.length, 'items read')
      })
    }, []);

  const saveIt = () => {
    console.log('saveItem:', { food, amount })
    push(ref(database, '/list'), { 'food': food, 'amount': amount});
    Keyboard.dismiss
  }

  const deleteIt = (item) => {
    
    remove(ref(database, '/list/' + item.key));
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder='Tuote'
          onChangeText={text => setFood(text)}
          value={food}
        />

        <TextInput
          style={styles.input}
          placeholder='Maara'
          onChangeText={text => setAmount(text)}
          value={amount}
        />
      </View>

      <View style={styles.button}>
        <Button
          title='Tallenna'
          onPress={saveIt}
        />
      </View>

      <View style={styles.table}>
        <FlatList
          ListHeaderComponent={() => <Text style={{fontSize: 20, fontWeight: "bold"}}>Lista</Text>}
          keyExtractor={(item) => String(item.id)}
          data={list}
          renderItem={({ item }) =>
            <View style={styles.row}>
              <Text>{`${item.food} ${item.amount}`}</Text>
              <Text style={styles.link} onPress={(() => deleteIt(item))}>Saatu</Text>
            </View> 
          }
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 300,
    borderWidth:3,
    padding:10,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  table: {
    width: '70%',
    alignItems: 'center',
    margin: 40,
  },
  row: {
    margin: 10,
  },
  link: {
    color: 'blue',
    fontWeight: 'bold'
  },
  button: {
    margin: 5,
  }
});
