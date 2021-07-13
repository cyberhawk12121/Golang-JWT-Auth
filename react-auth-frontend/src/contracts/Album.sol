pragma solidity >=0.4.21 <0.6.0;

contract Album{
    string public image;
    string public username;
    function set(string memory _image, string memory _username){
        image=_image;
        username= _username;
    }

    function get() public view returns(string names){
        return image;
        return username;
    }
}