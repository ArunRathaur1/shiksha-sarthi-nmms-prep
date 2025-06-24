#include<bits/stdc++.h>
using namespace std;
void solve(){
   int k;
   cin>>k;
    if(k>=0&&k<=9){
        cout<<k<<endl;
    }
    else if(k>=10&& k<99){
        k=k-9;
        int p=k/2;
        if(p*2==k){
            cout<<(p+9)%10<<endl;
        }
        else{
            cout<<(p+9)/10<<endl;
        }
    }
}
int main()
{
    int t;
    cin>>t;
    while(t--){
        solve();
    }
}
