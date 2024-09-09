import { Text, Pressable, View } from 'react-native';
import { Link } from 'expo-router';
import Button from './Button';
export default function Header(){
  return (
    <View>
      <Link href='/'>
        <Button
          corFundo='green'
          label='Home'
        />
      </Link>
      <Link href="/max" asChild>
        <Button 
          corFundo='blue'
          label='max'
        />
      </Link>
      <Link href="/campeao" asChild>
        <Button 
          corFundo='red'
          label='campeao'
        />
      </Link>
  </View>
  )
}
