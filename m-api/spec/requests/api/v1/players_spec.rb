require 'rails_helper'

describe 'PlayerAPI' do
  it '全てのplayerを取得する' do
    FactoryBot.create_list(:player, 10)

    get '/api/v1/players'
    json = JSON.parse(response.body)

    # リクエスト成功を表す200が返ってきたか確認する。
    expect(response.status).to eq(200)

    # 正しい数のデータが返されたか確認する。
    expect(json['data'].length).to eq(10)
  end

  it '特定のplayerを取得する' do
    player = create(:player, name: 'test-player')

    get "/api/v1/players/#{player.id}"
    json = JSON.parse(response.body)

    # リクエスト成功を表す200が返ってきたか確認する。
    expect(response.status).to eq(200)

    # 要求した特定のポストのみ取得した事を確認する
    expect(json['data']['name']).to eq(player.name)
  end

  # it '新しいplayerを作成する' do
  #   valid_params = { name: 'name' }

  #   #データが作成されている事を確認
  #   expect { player '/api/v1/players', params: { player: valid_params } }.to change(Player, :count).by(+1)

  #   # リクエスト成功を表す200が返ってきたか確認する。
  #   expect(response.status).to eq(200)
  # end

  it 'playerの編集を行う' do
    player = create(:player, name: 'old-name')

    put "/api/v1/players/#{player.id}", params: { player: {name: 'new-name'}  }
    json = JSON.parse(response.body)

    # リクエスト成功を表す200が返ってきたか確認する。
    expect(response.status).to eq(200)

    #データが更新されている事を確認
    expect(json['data']['name']).to eq('new-name')
  end

  it 'playerを削除する' do
  player = create(:player)

  #データが削除されている事を確認
  expect { delete "/api/v1/players/#{player.id}" }.to change(Player, :count).by(-1)

  # リクエスト成功を表す200が返ってきたか確認する。
  expect(response.status).to eq(200)
end
end