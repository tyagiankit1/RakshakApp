import  React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, FAB, List, DataTable } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { addUser, deleteUser } from '../redux/userApp'

import Header from '../components/Header'
import {UsersContext } from '../context/UsersContext';


const optionsPerPage = [2, 3, 4];
function ViewNotes({ navigation }) {
  const usersContext = useContext(UsersContext)
  const { users, vehicle } = usersContext;

  const notes = useSelector(state => state)
  const dispatch = useDispatch()
  const addUser = user => dispatch(addUser(user))
  const deleteUser = id => dispatch(deleteUser(id))

  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <Header titleText='Simple Note Taker' />
      <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>RC Number</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Image</DataTable.Title>
        </DataTable.Header>


        {vehicle.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>You do not have any notes</Text>
          </View>
        ) : (
          <FlatList
            data={vehicle}
            // style={{maxHeight: '85%'}}
            renderItem={({ item }) => (
              <>
                <DataTable.Row>
                  <DataTable.Cell>{item.rc_number}</DataTable.Cell>
                  <DataTable.Cell>{item.owner_name}</DataTable.Cell>
                  <DataTable.Cell>{item.qr_img}</DataTable.Cell>
                </DataTable.Row>
              </>
            )}
            keyExtractor={item => item.rc_number}
          />
        )}
        

        <DataTable.Pagination
          page={page}
          numberOfPages={10}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
        />
      </DataTable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10
  },
  listTitle: {
    fontSize: 20
  }
})

export default ViewNotes
