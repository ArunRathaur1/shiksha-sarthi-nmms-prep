#include<bits/stdc++.h>
using namespace std;
void solve(){
    long long n,x,y;
    cin>>n>>x>>y;
    long long odd=0;
    for(long long i=0;i<n;i++){
        long long tem;
        cin>>tem;
        if(tem%2!=0)odd++;
    }
    if(x%2!=0)odd++;
    if(odd%2==0&& y%2==0){
        cout<<"Alice"<<endl;
    }
    else if(odd%2!=0 && y%2!=0){
        cout<<"Alice"<<endl;
    }
    else{
        cout<<"Bob"<<endl;
    }

}
int main(){
    long long t;
    cin>>t;
    while(t--){
        solve();
    }
}